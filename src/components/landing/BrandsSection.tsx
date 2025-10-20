const brands = ['Vercel', 'Loom', 'Cash App', 'Loops', 'Zapier', 'Ramp', 'Raycast'];

const BrandsSection = () => {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl border border-white/5 bg-black/60 px-8 py-12 text-white/50 backdrop-blur-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">Conectamos com os líderes</p>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm uppercase tracking-[0.4em]">
          {brands.map((brand) => (
            <span key={brand} className="text-white/40 transition hover:text-white">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;

