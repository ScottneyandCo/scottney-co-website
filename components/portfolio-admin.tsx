"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Pencil,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { portfolioImageUrl, type PortfolioCategory, type PortfolioItem } from "@/lib/portfolio";
import { LogoutButton } from "@/components/logout-button";

type Props = {
  userId: string;
  userEmail: string;
  categories: PortfolioCategory[];
  initialItems: PortfolioItem[];
};

type Status = { kind: "ok" | "err"; message: string } | null;

export function PortfolioAdmin({ userId, userEmail, categories, initialItems }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? "Uncategorized";
  const categorySlug = (id: string) => categories.find((c) => c.id === id)?.slug ?? "misc";

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(selected ? URL.createObjectURL(selected) : null);
  }

  function resetForm() {
    setTitle("");
    setDetails("");
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || !categoryId || !title.trim()) {
      setStatus({ kind: "err", message: "Add a category, title, and image first." });
      return;
    }

    setUploading(true);
    setStatus(null);

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${categorySlug(categoryId)}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      setUploading(false);
      setStatus({ kind: "err", message: `Upload failed: ${uploadError.message}` });
      return;
    }

    const sortOrder = items.filter((i) => i.category_id === categoryId).length;
    const { data, error: insertError } = await supabase
      .from("portfolio_items")
      .insert({
        category_id: categoryId,
        owner_id: userId,
        title: title.trim(),
        details: details.trim() || null,
        image_path: path,
        sort_order: sortOrder,
        published: true,
      })
      .select()
      .single();

    if (insertError || !data) {
      await supabase.storage.from("portfolio").remove([path]);
      setUploading(false);
      setStatus({ kind: "err", message: `Could not save: ${insertError?.message ?? "unknown error"}` });
      return;
    }

    setItems((prev) => [...prev, data as PortfolioItem]);
    resetForm();
    setUploading(false);
    setStatus({ kind: "ok", message: "Uploaded and published." });
  }

  async function togglePublish(item: PortfolioItem) {
    const { error } = await supabase
      .from("portfolio_items")
      .update({ published: !item.published, updated_at: new Date().toISOString() })
      .eq("id", item.id);
    if (error) {
      setStatus({ kind: "err", message: error.message });
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, published: !i.published } : i)));
  }

  async function handleDelete(item: PortfolioItem) {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("portfolio_items").delete().eq("id", item.id);
    if (error) {
      setStatus({ kind: "err", message: error.message });
      return;
    }
    await supabase.storage.from("portfolio").remove([item.image_path]);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setStatus({ kind: "ok", message: "Item deleted." });
  }

  function startEdit(item: PortfolioItem) {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDetails(item.details ?? "");
  }

  async function saveEdit(item: PortfolioItem) {
    const { error } = await supabase
      .from("portfolio_items")
      .update({
        title: editTitle.trim() || item.title,
        details: editDetails.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);
    if (error) {
      setStatus({ kind: "err", message: error.message });
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, title: editTitle.trim() || item.title, details: editDetails.trim() || null } : i,
      ),
    );
    setEditingId(null);
  }

  async function move(item: PortfolioItem, direction: -1 | 1) {
    const group = items
      .filter((i) => i.category_id === item.category_id)
      .sort((a, b) => a.sort_order - b.sort_order);
    const index = group.findIndex((i) => i.id === item.id);
    const swapWith = group[index + direction];
    if (!swapWith) return;

    const updates = [
      { id: item.id, sort_order: swapWith.sort_order },
      { id: swapWith.id, sort_order: item.sort_order },
    ];
    await Promise.all(
      updates.map((u) =>
        supabase.from("portfolio_items").update({ sort_order: u.sort_order }).eq("id", u.id),
      ),
    );
    setItems((prev) =>
      prev.map((i) => {
        const match = updates.find((u) => u.id === i.id);
        return match ? { ...i, sort_order: match.sort_order } : i;
      }),
    );
  }

  const grouped = useMemo(() => {
    const map = new Map<string, PortfolioItem[]>();
    for (const item of items) {
      const list = map.get(item.category_id) ?? [];
      list.push(item);
      map.set(item.category_id, list);
    }
    for (const list of map.values()) list.sort((a, b) => a.sort_order - b.sort_order);
    return map;
  }, [items]);

  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Scottney and Company home">
          <Image src="/scottney-logo.png" alt="Scottney & Co. Digital Marketing" width={180} height={180} priority />
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/work">Work</Link>
          <Link href="/services">Services</Link>
        </nav>
        <Link className="button button-small" href="/work">View site</Link>
      </header>

      <div className="admin-wrap">
        <div className="admin-top">
          <h1>Manage work</h1>
          <div className="admin-actions">
            <span className="admin-user">{userEmail}</span>
            <LogoutButton />
          </div>
        </div>

        <div className="admin-layout">
          <form className="admin-form" onSubmit={handleUpload}>
            <h2>Add a piece</h2>

            <label>
              <span>Category</span>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Into the Woods — Program"
              />
            </label>

            <label>
              <span>Details (optional)</span>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Client, year, or a short note about the piece."
              />
            </label>

            <label className="admin-file">
              <Upload size={18} /> {file ? file.name : "Choose an image"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{ display: "none" }}
              />
            </label>

            {previewUrl ? (
              <div className="admin-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Selected upload preview" />
              </div>
            ) : null}

            <button className="button" type="submit" disabled={uploading}>
              {uploading ? "Uploading…" : "Upload & publish"}
              <Upload size={18} />
            </button>

            {status ? <p className={`admin-status ${status.kind}`}>{status.message}</p> : null}
          </form>

          <div>
            {categories.map((category) => {
              const list = grouped.get(category.id) ?? [];
              return (
                <section key={category.id} style={{ marginBottom: 40 }}>
                  <h2 style={{ textTransform: "uppercase", margin: "0 0 18px" }}>
                    {category.name} <span style={{ opacity: 0.5 }}>({list.length})</span>
                  </h2>
                  {list.length === 0 ? (
                    <p className="admin-empty">No pieces yet. Upload your first one on the left.</p>
                  ) : (
                    <div className="admin-items">
                      {list.map((item, index) => (
                        <article className="admin-item" key={item.id}>
                          <div className="admin-item-thumb">
                            <Image
                              src={portfolioImageUrl(item.image_path)}
                              alt={item.title}
                              fill
                              sizes="96px"
                            />
                          </div>

                          {editingId === item.id ? (
                            <div className="admin-item-meta">
                              <div className="admin-edit-row">
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <textarea
                                  value={editDetails}
                                  onChange={(e) => setEditDetails(e.target.value)}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="admin-item-meta">
                              <h3>{item.title}</h3>
                              {item.details ? <p>{item.details}</p> : null}
                              <span className={`admin-badge ${item.published ? "pub" : "hid"}`}>
                                {item.published ? "Published" : "Hidden"}
                              </span>
                            </div>
                          )}

                          <div className="admin-actions">
                            <button
                              className="admin-btn"
                              type="button"
                              onClick={() => move(item, -1)}
                              disabled={index === 0}
                              aria-label="Move up"
                            >
                              <ArrowUp size={16} />
                            </button>
                            <button
                              className="admin-btn"
                              type="button"
                              onClick={() => move(item, 1)}
                              disabled={index === list.length - 1}
                              aria-label="Move down"
                            >
                              <ArrowDown size={16} />
                            </button>
                            <button
                              className="admin-btn"
                              type="button"
                              onClick={() => togglePublish(item)}
                            >
                              {item.published ? <EyeOff size={16} /> : <Eye size={16} />}
                              {item.published ? "Hide" : "Show"}
                            </button>
                            {editingId === item.id ? (
                              <button className="admin-btn" type="button" onClick={() => saveEdit(item)}>
                                <Save size={16} /> Save
                              </button>
                            ) : (
                              <button className="admin-btn" type="button" onClick={() => startEdit(item)}>
                                <Pencil size={16} /> Edit
                              </button>
                            )}
                            {editingId === item.id ? (
                              <button className="admin-btn" type="button" onClick={() => setEditingId(null)}>
                                <X size={16} /> Cancel
                              </button>
                            ) : (
                              <button
                                className="admin-btn danger"
                                type="button"
                                onClick={() => handleDelete(item)}
                              >
                                <Trash2 size={16} /> Delete
                              </button>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
