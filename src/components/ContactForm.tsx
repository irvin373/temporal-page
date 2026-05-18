import { useState, type ChangeEvent, type FormEvent } from "react";

const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

interface FormState {
  name: string;
  company: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              from_name: form.name,
              from_email: form.email,
              company: form.company,
              message: form.message,
              to_email: "info@elementsafetyllc.com",
              // to_email: "rochacristhian77@gmail.com", //test
            },
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", company: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <div className="space-y-5">
        <p className="text-xl font-semibold text-black mb-6">
          Send us a message
        </p>

        <div>
          <label htmlFor="name" className="block text-gray-500 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A3DA4] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-gray-500 font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A3DA4] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-500 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A3DA4] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-500 font-medium mb-2">
            How can we help?
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            className="w-full h-[75px] px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A3DA4] focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="flex flex-row justify-center items-center w-[260.45px] h-[40px] mx-auto bg-[#1B3A9B] text-white border-[1.065px] border-white rounded-[4.261px] gap-[3.55px] p-[3.55px] transition-colors hover:bg-[#152e7a] text-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Submit inquiry"
          )}
        </button>

        {/* Success message */}
        {status === "success" && (
          <div className="flex items-center gap-2 justify-center text-green-600 bg-green-50 border border-green-200 rounded-lg p-3 mt-3 animate-fade-in">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
          </div>
        )}

        {/* Error message */}
        {status === "error" && (
          <div className="flex items-center gap-2 justify-center text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mt-3 animate-fade-in">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-medium">Failed to send. Please try again or email us directly.</span>
          </div>
        )}
      </div>
    </form>
  );
}
