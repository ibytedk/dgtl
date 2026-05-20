import { formatDate } from "@/lib/format";
import { newsPosts } from "@/lib/sample-data";

export default function NewsPage() {
  return (
    <main>
      <section className="page-hero">
        <h1>Nyheder</h1>
        <p>Seneste beskeder fra ligaen, kalenderen og filpakkerne.</p>
      </section>
      <section className="section shell">
        <div className="news-list">
          {newsPosts.map((post) => (
            <article key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.publishedAt ? formatDate(post.publishedAt) : "Kladde"}</p>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
