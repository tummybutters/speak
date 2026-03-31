export default function Footer() {
  return (
    <footer className="bg-black text-white/30 py-6 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 font-sans text-xs">
        <span>
          &copy; {new Date().getFullYear()} Sand &amp; Sea Realty. All rights reserved.
        </span>
        <span>
          4876 Santa Monica Ave, Suite A, San Diego, CA 92107 &nbsp;&middot;&nbsp; DRE Licensed
        </span>
      </div>
    </footer>
  );
}
