export function BrandLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-5 text-center"
      >
        <div className="brand-loader-mark" aria-hidden="true">
          <div className="brand-loader-ring" />
          <div className="brand-loader-cube">
            <div className="brand-loader-face brand-loader-face-top" />
            <div className="brand-loader-face brand-loader-face-bottom" />
            <div className="brand-loader-face brand-loader-face-front" />
            <div className="brand-loader-face brand-loader-face-back" />
            <div className="brand-loader-face brand-loader-face-right" />
            <div className="brand-loader-face brand-loader-face-left" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xs text-muted">
            <span className="text-accent">[</span>thedevbox
            <span className="text-accent">]</span>
          </div>
          <div className="text-3xs uppercase tracking-widest text-muted">
            loading
          </div>
        </div>
      </div>
    </div>
  );
}
