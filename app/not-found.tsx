import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page wrap not-found">
      <p className="label">The Renz Report · A missing page</p>
      <p className="not-found-code" aria-hidden="true">404</p>
      <h1>This page is out of print.</h1>
      <p>The address may have changed. Return to the portfolio to read about my work and projects.</p>
      <Link className="btn btn-solid" href="/">← Back to portfolio</Link>
    </main>
  );
}
