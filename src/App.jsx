import SwitchButton from "./SwitchButton";

function App() {
  return (
    <main className="w-80 bg-slate-50 px-5 py-5 text-slate-900">
      <header className="mb-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          TÙY CHỈNH GIAO DIỆN
        </p>
        <h1 className="text-xl font-bold">Chủ đề Zalo</h1>
      </header>
      <SwitchButton />
    </main>
  );
}

export default App;
