import Link from 'next/link'
import { ArrowRight, Users, Clock, CircleCheck as CheckCircle, Monitor, ChartBar as BarChart3, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-neutral-900 rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xs">Q</span>
            </div>
            <span className="text-lg font-semibold text-neutral-900">QueueBridge</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              How it works
            </Link>
            <Link href="/admin" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Admin
            </Link>
          </div>

          <Link
            href="/citizen"
            className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Left - Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Queue Management System
              </div>

              <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
                Stop the chaos in your waiting room.
              </h1>

              <p className="text-lg text-neutral-500 max-w-lg leading-relaxed">
                A minimal, powerful queue management system for offices and healthcare facilities.
                Real-time tracking, instant notifications, zero friction.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-medium rounded-md hover:bg-neutral-800 transition-colors group"
                >
                  Open Dashboard
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3 text-neutral-600 font-medium hover:text-neutral-900 transition-colors"
                >
                  See how it works
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 text-sm text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Free tier available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>Setup in minutes</span>
                </div>
              </div>
            </div>

            {/* Right - Stats Card */}
            <div className="lg:col-span-2 relative">
              <div className="absolute -inset-4 bg-neutral-50 rounded-2xl" />
              <div className="relative bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Live Stats</span>
                  <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-sm text-neutral-500">Currently serving</span>
                      <span className="text-4xl font-semibold tracking-tight">A-047</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">Waiting</p>
                      <p className="text-2xl font-semibold">12</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">Avg Wait</p>
                      <p className="text-2xl font-semibold">8<span className="text-sm font-normal text-neutral-400">m</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">Served</p>
                      <p className="text-2xl font-semibold">47</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Marquee */}
      <section className="py-12 border-y border-neutral-100 bg-neutral-50 overflow-hidden">
        <p className="text-center text-xs font-medium text-neutral-400 uppercase tracking-widest mb-6">
          Trusted by modern offices
        </p>
        <div className="relative">
          {/* Gradient Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10" />

          {/* Marquee Track — 4 sets, translate -50% = 2 full sets = seamless */}
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center" aria-hidden={setIndex > 0}>
                {['City Health', 'Metro Services', 'QuickCare', 'OfficeHub', 'FastTrack', 'MediCore', 'CivicPlus', 'SwiftLine'].map((brand, i) => (
                  <span key={`${setIndex}-${i}`} className="inline-flex items-center gap-10 px-10">
                    <span className="text-sm font-medium text-neutral-300 whitespace-nowrap">{brand}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-200 shrink-0" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Everything you need
            </h2>
            <p className="text-neutral-500 max-w-lg mx-auto">
              Simple tools that work together seamlessly. No bloat, no learning curve.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 bg-neutral-900 text-white rounded-2xl p-8 md:p-10 group-hover:bg-neutral-800 transition-colors min-h-[280px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
                  <Monitor className="w-3.5 h-3.5" />
                  Display Board
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
                  Put up a display. Done.
                </h3>
                <p className="text-neutral-400 max-w-md leading-relaxed">
                  A beautiful, auto-updating display board for your waiting area.
                  Shows who's being served, estimated wait times, and keeps everyone informed.
                </p>
              </div>
              <Link
                href="/admin/display-board"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors group mt-6"
              >
                View Display Board
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 min-h-[280px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 uppercase tracking-wider mb-6">
                  <Users className="w-3.5 h-3.5" />
                  Booking
                </div>
                <h3 className="text-xl font-medium tracking-tight mb-3">
                  Simple booking flow
                </h3>
                <p className="text-emerald-700/70 text-sm leading-relaxed">
                  Citizens book in under a minute. Get a unique token, track position in real-time.
                </p>
              </div>
              <Link
                href="/citizen"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors group mt-6"
              >
                Try booking
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-neutral-100 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
                  <Zap className="w-3.5 h-3.5" />
                  Real-time
                </div>
                <h3 className="text-lg font-medium tracking-tight mb-2">
                  Instant updates
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  WebSocket-powered live tracking. Know immediately when it's your turn.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-neutral-100 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  ETA Estimates
                </div>
                <h3 className="text-lg font-medium tracking-tight mb-2">
                  Accurate wait times
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Smart algorithms calculate wait times based on actual service duration.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-neutral-100 rounded-2xl p-8 min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
                  <Shield className="w-3.5 h-3.5" />
                  Secure
                </div>
                <h3 className="text-lg font-medium tracking-tight mb-2">
                  Data safe
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  End-to-end encryption, secure tokens, and privacy-first design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4 block">
                How it works
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                Three steps to an organized queue
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Get started in minutes. No complex setup, no training required.
                Your staff and citizens will thank you.
              </p>

              <div className="space-y-6">
                {[
                  { step: '01', title: 'Set up your office', desc: 'Add services, time slots, and counters in the admin dashboard.' },
                  { step: '02', title: 'Share the booking link', desc: 'Citizens can book online or walk-in and get a token instantly.' },
                  { step: '03', title: 'Manage the queue', desc: 'Call next, mark complete, view analytics. Rinse, repeat.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <span className="text-xs font-mono text-neutral-300">{item.step}</span>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-neutral-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual — Flow Diagram */}
            <div className="relative">
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 relative overflow-hidden">
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-8">Flow overview</p>

                <div className="flex flex-col gap-0">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="w-px flex-1 bg-neutral-100 my-2" style={{ minHeight: '40px' }} />
                    </div>
                    <div className="pb-10 pt-1.5">
                      <p className="text-sm font-medium text-neutral-900 mb-1">Set up your office</p>
                      <p className="text-xs text-neutral-400 leading-relaxed">Add services, time slots & counters</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div className="w-px flex-1 bg-neutral-100 my-2" style={{ minHeight: '40px' }} />
                    </div>
                    <div className="pb-10 pt-1.5">
                      <p className="text-sm font-medium text-neutral-900 mb-1">Citizens book & get tokens</p>
                      <p className="text-xs text-neutral-400 leading-relaxed">Online booking or walk-in, instant QR ticket</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                    </div>
                    <div className="pt-1.5">
                      <p className="text-sm font-medium text-neutral-900 mb-1">Manage & complete</p>
                      <p className="text-xs text-neutral-400 leading-relaxed">Call next, track analytics, done</p>
                    </div>
                  </div>
                </div>

                {/* Mini Token Preview */}
                <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                      <span className="text-white text-xs font-mono font-bold">A</span>
                    </div>
                    <div>
                      <p className="text-xs font-mono font-semibold text-neutral-900">A-047</p>
                      <p className="text-[10px] text-neutral-400">Now serving</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Analytics Card */}
            <div className="order-2 lg:order-1">
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-medium">Daily Analytics</h4>
                  <span className="text-xs text-neutral-400">Jan 27, 2026</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-500">Completion rate</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-neutral-900 rounded-full w-[87%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-500">No-show rate</span>
                      <span className="font-medium text-rose-500">8%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full w-[8%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-100">
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">Peak Hour</p>
                      <p className="text-xl font-semibold">14:00</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 mb-1">Avg Wait</p>
                      <p className="text-xl font-semibold">12 <span className="text-sm font-normal text-neutral-400">min</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">
                <BarChart3 className="w-3.5 h-3.5" />
                Analytics
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                Understand your operations
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Built-in analytics help you understand peak hours, track average wait times,
                and identify opportunities to improve efficiency.
              </p>
              <ul className="space-y-3">
                {[
                  'Identify peak hours for better staffing',
                  'Track real-time wait vs. service goals',
                  'Monitor and reduce no-show rates',
                  'Export reports for management review',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
            Ready to streamline your queue?
          </h2>
          <p className="text-neutral-400 mb-10 max-w-lg mx-auto">
            Start managing your queue in minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-neutral-900 font-medium rounded-md hover:bg-neutral-100 transition-colors group"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/citizen"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-neutral-300 font-medium hover:text-white transition-colors"
            >
              Try booking flow
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-neutral-900 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Q</span>
                </div>
                <span className="font-semibold text-neutral-900">QueueBridge</span>
              </Link>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
                Modern queue management for offices and healthcare facilities.
                Built with Next.js and PostgreSQL.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/citizen" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Citizen Booking</Link></li>
                <li><Link href="/admin" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Admin Dashboard</Link></li>
                <li><Link href="/admin/display-board" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Display Board</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">Stack</h4>
              <ul className="space-y-2">
                <li><span className="text-sm text-neutral-600">Next.js 16</span></li>
                <li><span className="text-sm text-neutral-600">PostgreSQL</span></li>
                <li><span className="text-sm text-neutral-600">Redis</span></li>
                <li><span className="text-sm text-neutral-600">Tailwind CSS</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400">2026 QueueBridge</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">Privacy</Link>
              <Link href="#" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
