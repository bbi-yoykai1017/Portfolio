  import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Career Odyssey — Journey Through My Universe" },
      { name: "description", content: "An immersive 3D portfolio: pilot a ship through planets of Origin, Skills, Projects, Experience and Contact." },
      { property: "og:title", content: "Career Odyssey" },
      { property: "og:description", content: "Pilot through my career as a 3D space odyssey." },
    ],
  }),
  component: Index,
});

function Index() {
  const odysseySrc = `${import.meta.env.BASE_URL}index.html`;

  return (
    <iframe
      src={odysseySrc}
      title="Career Odyssey"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: 0,
        margin: 0,
        padding: 0,
        background: "#02040b",
      }}
      allow="autoplay"
    />
  );
}
