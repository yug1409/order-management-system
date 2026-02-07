import "@testing-library/jest-dom";
import { vi } from "vitest";

/* ---- MOCK FETCH ---- */
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => [],
  })
);

/* ---- MOCK XMLHttpRequest (CRITICAL) ---- */
class MockXHR {
  open() {}
  send() {
    this.onload?.();
  }
  setRequestHeader() {}
}
global.XMLHttpRequest = MockXHR;

/* ---- MOCK UNHANDLED ERRORS ---- */
vi.stubGlobal("onerror", () => {});
vi.stubGlobal("onunhandledrejection", () => {});
