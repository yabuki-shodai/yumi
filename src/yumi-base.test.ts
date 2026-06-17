import { describe, expect, it } from "vitest";

import { Yumi } from "./index.js";

describe("Yumi#get", () => {
  it("registers a GET route", () => {
    const app = new Yumi();
    const handler = () => new Response("ok");

    app.get("/hello", handler);

    expect(app.getRoutes()).toEqual([
      {
        method: "GET",
        path: "/hello",
        handler,
      },
    ]);
  });

  it("GET http://localhost/hello is ok", async () => {
    const app = new Yumi();

    app.get("/hello", async () => {
      return new Response("hello", {
        status: 200,
        statusText: "Yumi is OK",
      });
    });

    const res = await app.request("http://localhost/hello");

    expect(res).not.toBeNull();
    expect(res.status).toBe(200);
    expect(res.statusText).toBe("Yumi is OK");
    expect(await res.text()).toBe("hello");
  });

  it("GET http://localhost/not-found is 404", async () => {
    const app = new Yumi();

    const res = await app.request("http://localhost/not-found");

    expect(res).not.toBeNull();
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("Not Found");
  });

  it("GET /books json is ok", async () => {
    const app = new Yumi();
    const books = [
      { id: 1, title: "The Great Gatsby" },
    ]
    app.get("/books", (c) => {
      return c.json({ books }, { status: 200 });
    });

    const res = await app.request("http://localhost/books");

    expect(res).not.toBeNull();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ books });
  });
});
