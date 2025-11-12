'use client';

import { useRef, type CSSProperties } from 'react';

const OKLCH_REGEX = /oklch\(([^)]+)\)/g;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const parsePercentageOrNumber = (input: string) => {
  const trimmed = input.trim();
  if (trimmed.endsWith('%')) {
    return parseFloat(trimmed) / 100;
  }
  return parseFloat(trimmed);
};

const parseHue = (input: string) => {
  const trimmed = input.trim();
  if (trimmed.endsWith('deg')) {
    return parseFloat(trimmed) * (Math.PI / 180);
  }
  if (trimmed.endsWith('rad')) {
    return parseFloat(trimmed);
  }
  if (trimmed.endsWith('turn')) {
    return parseFloat(trimmed) * 2 * Math.PI;
  }
  if (trimmed.endsWith('grad')) {
    return parseFloat(trimmed) * (Math.PI / 200);
  }
  return parseFloat(trimmed) * (Math.PI / 180);
};

const parseAlpha = (input?: string) => {
  if (!input) return 1;
  const trimmed = input.trim();
  if (trimmed === 'none') return 0;
  if (trimmed.endsWith('%')) {
    return clamp(parseFloat(trimmed) / 100, 0, 1);
  }
  const value = parseFloat(trimmed);
  if (Number.isNaN(value)) return 1;
  return clamp(value, 0, 1);
};

const linearToSrgb = (value: number) => {
  const v = clamp(value, 0, 1);
  if (v <= 0.0031308) {
    return 12.92 * v;
  }
  return 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
};

const formatColor = (r: number, g: number, b: number, a: number) => {
  const to255 = (v: number) => Math.round(clamp(v, 0, 1) * 255);
  const red = to255(r);
  const green = to255(g);
  const blue = to255(b);
  if (a >= 0.999) {
    return `rgb(${red}, ${green}, ${blue})`;
  }
  return `rgba(${red}, ${green}, ${blue}, ${parseFloat(a.toFixed(3))})`;
};

const oklchToRgb = (oklch: string) => {
  try {
    const inner = oklch.slice(oklch.indexOf('(') + 1, oklch.lastIndexOf(')'));
    const [components, alphaPart] = inner.split('/');
    const [lStr, cStr, hStr] = components.trim().split(/\s+/);
    const L = parsePercentageOrNumber(lStr ?? '0');
    const C = parseFloat((cStr ?? '0').trim());
    const h = parseHue(hStr ?? '0');
    const aComponent = Math.cos(h) * C;
    const bComponent = Math.sin(h) * C;

    const l_ = L + 0.3963377774 * aComponent + 0.2158037573 * bComponent;
    const m_ = L - 0.1055613458 * aComponent - 0.0638541728 * bComponent;
    const s_ = L - 0.0894841775 * aComponent - 1.291485548 * bComponent;

    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    const rLinear = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const gLinear = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bLinear = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

    const r = linearToSrgb(rLinear);
    const g = linearToSrgb(gLinear);
    const b = linearToSrgb(bLinear);
    const alpha = parseAlpha(alphaPart);

    return formatColor(r, g, b, alpha);
  } catch {
    return oklch;
  }
};

const replaceOklchValues = (value: string) => value.replace(OKLCH_REGEX, (match) => oklchToRgb(match));

const replaceOklchColors = (root: HTMLElement) => {
  const applied: Array<() => void> = [];

  const processNode = (node: Element) => {
    if (!(node instanceof HTMLElement)) return;
    const computedStyle = window.getComputedStyle(node);
    for (let i = 0; i < computedStyle.length; i += 1) {
      const property = computedStyle[i];
      const originalValue = computedStyle.getPropertyValue(property);
      if (!originalValue.includes('oklch')) continue;
      const converted = replaceOklchValues(originalValue);
      const previousInlineValue = node.style.getPropertyValue(property);

      node.style.setProperty(property, converted);
      applied.push(() => {
        if (previousInlineValue) {
          node.style.setProperty(property, previousInlineValue);
        } else {
          node.style.removeProperty(property);
        }
      });
    }
    Array.from(node.children).forEach((child) => processNode(child));
  };

  processNode(root);

  return () => {
    while (applied.length) {
      const revert = applied.pop();
      if (revert) revert();
    }
  };
};

export default function CVPage() {
  const cvRef = useRef<HTMLDivElement>(null);
  const isPdfExportAvailable = false;
  const sectionCardClass =
    'bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 print:shadow-none print:border print:rounded-lg print:p-6 print:mb-6';
  const sectionStyle: CSSProperties = { pageBreakInside: 'avoid' };
  const pageBreakAfterStyle: CSSProperties = { breakAfter: 'page', pageBreakAfter: 'always' };
  const resumeContainerStyle: CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '0.75in',
    maxWidth: '8.27in',
    margin: '0 auto',
    boxSizing: 'border-box'
  };

  const generatePDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;

    const element = cvRef.current;
    if (!element) return;

    const options = {
      margin: 0.5,
      filename: 'Nathan_Mitchell_CV.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const },
      pagebreak: { mode: ['css', 'legacy'] as const }
    };

    const restoreColors = replaceOklchColors(element);

    try {
      await html2pdf().set(options).from(element).save();
    } finally {
      restoreColors();
    }
  };
  return (
    <main
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(to bottom, #f9fafb, #f3f4f6)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* PDF Generation Button - Fixed Position */}
        <div className="fixed top-20 right-4 z-10">
          <button
            onClick={isPdfExportAvailable ? generatePDF : undefined}
            disabled={!isPdfExportAvailable}
            aria-disabled={!isPdfExportAvailable}
            title={isPdfExportAvailable ? 'Export as PDF' : 'PDF export coming soon'}
            className="inline-flex items-center px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg transition-colors shadow-lg cursor-not-allowed"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            PDF Export (Coming Soon)
          </button>
        </div>

      <div ref={cvRef} className="cv-content" style={resumeContainerStyle}>
        {/* CV Header */}
        <div className={sectionCardClass} style={sectionStyle}>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Nathan Mitchell</h1>
            <p className="text-xl text-gray-600 mb-4">IT Engineer</p>
            <div className="flex gap-4 justify-center text-sm text-gray-500">
              <span>South Wales, United Kingdom</span>
              <span>•</span>
              <a href="mailto:nathan@mcsltd.io" className="hover:text-gray-900">nathan@mcsltd.io</a>
              <span>•</span>
              <span>07535 416590</span>
              <span>•</span>
              <a href="https://github.com/mitch478" className="hover:text-gray-900">GitHub</a>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className={sectionCardClass} style={sectionStyle}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Summary</h2>
          <p className="text-gray-600 leading-relaxed">
            As a IT Engineer with 9 years of experience in the tech industry. Starting off as a Helpdesk Engineer and working my way up to a Senior Infrastructure Engineer. Working multiple roles within the IT industry.
            I have a track record of delivering complex projects on time and within budget. Can support business with a wide range of IT services. Below is a list of my professional experience. I&apos;m currently looking for another contract 2 days a week can be on site or remote.
          </p>
        </div>

        {/* Experience */}
        <div className={sectionCardClass} style={{ ...sectionStyle, ...pageBreakAfterStyle }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h2>

          {/* Current Role - Director */}
          <div className="mb-8 pb-8 border-b border-gray-200" style={{ breakInside: 'avoid' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Director</h3>
                <p className="text-lg text-gray-600">Mitchell Cloud Solutions LTD</p>
              </div>
              <p className="text-gray-500">August 2024 - Present</p>
            </div>
            <p className="text-gray-600 mb-3">
              After 8 years in my IT career. I tried to launch a MSP business but it didn&apos;t work out. So I&apos;m now back to my roots as a IT Engineer. Mainly as a freelance contractor.
            </p>
          </div>

          {/* Current Contract Role */}
          <div className="mb-8 pb-8 border-b border-gray-200" style={{ breakInside: 'avoid' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Dedicated Service Desk Engineer</h3>
                <p className="text-lg text-gray-600">Contract for Manufacturing Company in South Wales</p>
              </div>
              <p className="text-gray-500">February 2025 - Present</p>
            </div>
            <p className="text-gray-600 mb-3">
              Contracted to provide desktop support for EU operations (UK & Germany),
              with additional support coverage for Asia and USA regions.
            </p>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Key Projects:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>KIOSK Tablets setup for Warehouse workers - Designed and implemented streamlined tablet configuration using Windows Configuration Designer and Windows 10 LTSC</li>
                <li>Windows 11 Roll out - Successfully rolled out to 50 devices ensuring applications were working correctly</li>
                <li>EU Office Visits - Travelled to EU offices for 1 week, providing on site support to end users</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Providing 1st, 2nd and 3rd line support to users</li>
                <li>Escalating complex technical issues to appropriate teams</li>
                <li>Creating and updating documentation</li>
                <li>Troubleshooting hardware/software issues</li>
                <li>Server support for ERP Solution</li>
              </ul>
            </div>
          </div>

          {/* ZPG LTD Role */}
          <div className="mb-8 pb-8 border-b border-gray-200" style={{ breakInside: 'avoid' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Senior Enterprise Platform Engineer</h3>
                <p className="text-lg text-gray-600">ZPG LTD (RVU & Houseful)</p>
              </div>
              <p className="text-gray-500">January 2024 - August 2024</p>
            </div>
            <p className="text-gray-600 mb-3">
              Confused.com was purchased by ZPG LTD - supporting a total of 1300 users across companies including
              Uswitch, Confused.com, Tempcover, and Zoopla.
            </p>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key Project - Zscaler ZIA Roll out:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>100 users rolled out Zscaler ZIA to replace Cisco Umbrella</li>
                <li>SSO Configuration via Entra ID for enhanced security posture</li>
                <li>Comprehensive policy configuration and testing with pilot groups</li>
                <li>Gradual rollout to 5 user groups with minimal disruption</li>
              </ul>
            </div>
          </div>

          {/* Confused.com Senior Role */}
          <div className="mb-8 pb-8 border-b border-gray-200" style={{ breakInside: 'avoid' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Senior Infrastructure Systems Engineer</h3>
                <p className="text-lg text-gray-600">Confused.com</p>
              </div>
              <p className="text-gray-500">January 2023 - January 2024</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Major Projects:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Migration of 22 Virtual Machines to Azure IaaS</li>
                <li>Migration from On-premise VDI to Windows 365 for 35 PCs</li>
                <li>Migration from Palo Alto Global Protect VPN to Zscaler Private Access (300 Users)</li>
                <li>Symantec Endpoint Protection to Microsoft Defender migration</li>
              </ul>
            </div>
          </div>

          {/* Infrastructure Systems Engineer */}
          <div className="mb-8 pb-8 border-b border-gray-200" style={{ breakInside: 'avoid' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Infrastructure Systems Engineer</h3>
                <p className="text-lg text-gray-600">Confused.com</p>
              </div>
              <p className="text-gray-500">January 2021 - January 2023</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Rolling out Autopilot (Hybrid AD Join) - migrated over 30 applications to Intune</li>
                <li>Azure Update Management implementation for 180 virtual machines</li>
                <li>Deployment of Zoom Rooms across 9 meeting rooms</li>
                <li>Microsoft 365 to Google Workspace migration for 350+ users</li>
              </ul>
            </div>
          </div>

          {/* Junior Systems Engineer */}
          <div className="mb-8 pb-8 border-b border-gray-200" style={{ breakInside: 'avoid' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Junior Systems Engineer</h3>
                <p className="text-lg text-gray-600">Confused.com</p>
              </div>
              <p className="text-gray-500">August 2019 - January 2021</p>
            </div>
            <p className="text-gray-600">
              Focused on empowering end users to work safely and securely. Managed COVID-19
              transition to remote work, implementing solutions for work-from-anywhere capabilities.
            </p>
          </div>

          {/* Admiral PLC */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">2nd Line Support Analyst</h3>
                <p className="text-lg text-gray-600">Admiral PLC</p>
              </div>
              <p className="text-gray-500">February 2019 - August 2019</p>
            </div>
            <p className="text-gray-600">
              Supported over 3500 users across Admiral group in South Wales, India & Canada.
              Part of Windows 7 to Windows 10 migration project affecting over 4000 desktops.
            </p>
          </div>

          {/* Early Confused.com Roles */}
          <div className="mb-8 pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Desktop Support Engineer / Jr Desktop Support Engineer</h3>
                <p className="text-lg text-gray-600">Confused.com</p>
              </div>
              <p className="text-gray-500">August 2016 - February 2019</p>
            </div>
            <p className="text-gray-600">
              Started career providing desktop support to 250 users. Progressed through roles with
              increasing responsibilities including SCCM application packaging, Windows 10 implementation,
              and on-call support duties.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className={sectionCardClass} style={sectionStyle}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Treorchy Comprehensive School</h3>
              <p className="text-gray-600">GCSE&apos;s and BTEC Qualifications</p>
              <p className="text-gray-500 text-sm">2011-2016</p>
              <div className="mt-3">
                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">GCSE Results:</h4>
                  <p className="text-sm text-gray-600">English Language (D), Religious Studies (D), Welsh (D), Maths (C)</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">BTEC Results:</h4>
                  <p className="text-sm text-gray-600">Business Studies (Distinction*), ICT (Distinction*), Engineering (Pass), Science (Pass), Welsh Baccalaureate (Pass)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className={sectionCardClass} style={sectionStyle}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4" style={{ breakInside: 'avoid' }}>
              <h3 className="font-semibold text-gray-900">Microsoft 365 Certified</h3>
              <p className="text-sm text-gray-600">Enterprise Administrator Expert</p>
              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Expert Level</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-4" style={{ breakInside: 'avoid' }}>
              <h3 className="font-semibold text-gray-900">Microsoft 365 Certified</h3>
              <p className="text-sm text-gray-600">Modern Desktop Administrator Associate</p>
              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Associate Level</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-4" style={{ breakInside: 'avoid' }}>
              <h3 className="font-semibold text-gray-900">Microsoft Technology Associate</h3>
              <p className="text-sm text-gray-600">Windows Server Administration Fundamentals</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">2017</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-4" style={{ breakInside: 'avoid' }}>
              <h3 className="font-semibold text-gray-900">Microsoft Certified Solutions Associate</h3>
              <p className="text-sm text-gray-600">Windows 10</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">2019</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-4" style={{ breakInside: 'avoid' }}>
              <h3 className="font-semibold text-gray-900">Microsoft Azure</h3>
              <p className="text-sm text-gray-600">Fundamentals</p>
              <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Fundamentals</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-4" style={{ breakInside: 'avoid' }}>
              <h3 className="font-semibold text-gray-900">Zscaler Certified</h3>
              <p className="text-sm text-gray-600">Cloud Administrator - Internet Access & Private Access Administrator</p>
              <span className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">Specialist</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a href="https://www.credly.com/users/nathan-mitchell.32849838/badges" className="text-blue-600 hover:text-blue-900 text-sm">
              View verified certifications on Credly →
            </a>
          </div>
        </div>

        {/* Technical Skills */}
        <div className={sectionCardClass} style={{ ...sectionStyle, ...pageBreakAfterStyle }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Microsoft Technologies</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Microsoft 365</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Intune (MDM)</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Windows 365</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Azure Virtual Desktop</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Windows 11 & macOS</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">PowerShell</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Azure Logic Apps</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Security & Networking</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Zscaler ZIA & ZPA</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Microsoft Defender</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Network Security</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Zero-Trust Architecture</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">VPN Solutions</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Infrastructure & Hardware</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Azure IaaS</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Dell Hardware</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Cloud Migration</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Virtualization</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">SCCM/Autopilot</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Projects & Achievements */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Major Project Highlights</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4" style={{ breakInside: 'avoid' }}>
              <h3 className="text-lg font-semibold text-gray-900">Azure Infrastructure Migration</h3>
              <p className="text-gray-600 mb-2">
                Successfully migrated 22 servers to Azure IaaS, implementing DevOps practices with Git and Bicep for infrastructure as code.
              </p>
              <p className="text-sm text-gray-500">Impact: Saved over £100K in hosting costs</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4" style={{ breakInside: 'avoid' }}>
              <h3 className="text-lg font-semibold text-gray-900">Zscaler Zero-Trust Implementation</h3>
              <p className="text-gray-600 mb-2">
                Led enterprise-wide migration from traditional VPN to Zscaler Private Access for 300+ users, implementing zero-trust architecture.
              </p>
              <p className="text-sm text-gray-500">Technologies: Zscaler ZPA/ZIA, Entra ID, Azure DevOps</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4" style={{ breakInside: 'avoid' }}>
              <h3 className="text-lg font-semibold text-gray-900">Microsoft 365 & Security Transformation</h3>
              <p className="text-gray-600 mb-2">
                Migrated 450 devices from Symantec to Microsoft Defender, integrated with Intune for unified endpoint management.
              </p>
              <p className="text-sm text-gray-500">Impact: £30K annual savings, enhanced security posture</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4" style={{ breakInside: 'avoid' }}>
              <h3 className="text-lg font-semibold text-gray-900">Windows 365 & Cloud Transformation</h3>
              <p className="text-gray-600 mb-2">
                Replaced on-premise VDI with Windows 365 cloud PCs, enabling remote work capabilities with zero-trust access.
              </p>
              <p className="text-sm text-gray-500">Technologies: Windows 365, Azure Virtual Desktop, Zscaler</p>
            </div>
          </div>
        </div>

        {/* Generate PDF Section */}
        <div className={sectionCardClass} style={sectionStyle}>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Export CV</h2>
            <p className="text-gray-600 mb-6">
              Generate and download a PDF version of this CV
            </p>
            <button
              onClick={isPdfExportAvailable ? generatePDF : undefined}
              disabled={!isPdfExportAvailable}
              aria-disabled={!isPdfExportAvailable}
              title={isPdfExportAvailable ? 'Export as PDF' : 'PDF export coming soon'}
              className="inline-flex items-center px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF Export Coming Soon
            </button>
            <p className="mt-3 text-sm text-gray-500">Automated PDF export will return shortly. Thanks for your patience!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600">
          <p className="mb-4">References available upon request</p>
          <p className="text-sm">IT Engineer | 9 Years Experience</p>
          <p className="text-sm mt-2">CV Last updated: November 2025</p>
        </div>
        </div>
      </div>
    </main>
  );
}