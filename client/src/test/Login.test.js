import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/Login";

describe("Login test", () => {
  it("Renders without crashing.", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  it("Have image in screen.", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("Have H1 in screen'.", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const header = screen.getByRole("heading", { name: "Bienvenidos" });
    expect(header).toBeInTheDocument();
  });

  it("Have button 'Ingresar'.", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: "Ingresar" });
    expect(button).toBeInTheDocument();
  });
  /*
  it("Clicking 'Ingresar' button redirects to /home", () => {
    render(
      <MemoryRouter>
        <Login setAccess={setAccess} />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: "Ingresar" });
    fireEvent.click(button);
    expect(window.location.pathname).toBe("/home");
  });
  */
});
