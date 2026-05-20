import { describe, expect, it } from "vitest";

import { defaultRuleDocuments, sanitizeRuleHtml } from "./rules";

describe("rule documents", () => {
  it("ships general and endurance default documents", () => {
    expect(defaultRuleDocuments.map((document) => document.slug)).toEqual([
      "generelle-regler",
      "dgtl-endurance"
    ]);
  });

  it("removes unsafe markup while keeping supported formatting", () => {
    const sanitized = sanitizeRuleHtml(
      '<h2 onclick="alert(1)">Regler</h2><script>alert(1)</script><a href="javascript:alert(1)">link</a><ol><li>OK</li></ol>'
    );

    expect(sanitized).toBe("<h2>Regler</h2><a>link</a><ol><li>OK</li></ol>");
  });
});
