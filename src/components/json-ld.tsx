/**
 * Renders a JSON-LD structured-data script. Pass a plain schema.org object as
 * `data`; it is serialised into a `<script type="application/ld+json">` tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
