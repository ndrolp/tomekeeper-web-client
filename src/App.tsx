import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="min-h-screen text-gray-900 p-4">
      <Button variant={"destructive"}>Prueba</Button>
      <h1 className="text-1xl font-bold mb-4">📚 Tomekeeper</h1>
      <p className="text-lg">Your personal library manager.</p>
    </div>
  );
}

export default App;
