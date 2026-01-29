import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-3">The Points Guy</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Your trusted guide to investment immigration.
              Explore residency programs in Portugal, Greece, and Panama.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Programs
            </h4>
            <nav className="space-y-2">
              <Link href="/portugal" className="block text-white/70 hover:text-white text-sm transition-colors">
                Portugal Golden Visa
              </Link>
              <Link href="/greece" className="block text-white/70 hover:text-white text-sm transition-colors">
                Greece Golden Visa
              </Link>
              <Link href="/panama" className="block text-white/70 hover:text-white text-sm transition-colors">
                Panama Qualified Investor
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Company
            </h4>
            <nav className="space-y-2">
              <Link href="/#about" className="block text-white/70 hover:text-white text-sm transition-colors">
                About Mercan
              </Link>
              <Link href="#lead-form" className="block text-white/70 hover:text-white text-sm transition-colors">
                Contact Us
              </Link>
              <Link href="/privacy" className="block text-white/70 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-white/70 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Disclaimer
            </h4>
            <p className="text-white/50 text-xs leading-relaxed">
              This website is operated in partnership with Mercan Group.
              Investment immigration programs are subject to government regulations and may change.
              Past performance is not indicative of future results.
              Consult with qualified professionals before making investment decisions.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} The Points Guy x Mercan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
