import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <section className="bg-accent-blue text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-10">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Subscribe to our newsletter</h2>
          <p className="text-gray-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Praesent tortor lacus, vehicula sagittis dapibus, sodales ad. Suspendisse vitae arcu vel
            metus. Donec semper porttitor sodales viverra mauris.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="flex-1 h-11 sm:h-12 px-4 rounded text-dark placeholder:text-dark-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-0 rounded transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            SUBSCRIBE →
          </button>
        </form>

        {/* Brand logos — hidden on small mobile, scrollable on tablet */}
        <div className="hidden sm:flex items-center justify-center gap-6 md:gap-12 mt-8 sm:mt-10 text-gray-300 text-xs sm:text-sm font-semibold opacity-70 flex-wrap">
          <span>Google</span>
          <span>Amazon</span>
          <span>PHILIPS</span>
          <span>HUAWEI</span>
          <span>SAMSUNG</span>
        </div>
      </div>
    </section>
  );
}
