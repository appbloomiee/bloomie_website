import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsConditions = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes back to previous page in browser history
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back</span>
          </button>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: November 18, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using Bloomie AI ("the App"), you agree to be bound by these Terms and Conditions. 
                If you disagree with any part of these terms, you may not access the App.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-700 mb-4">
                We grant you a personal, non-exclusive, non-transferable, limited license to use the Bloomie AI 
                application for your personal, non-commercial use, subject to these Terms and Conditions.
              </p>
              <p className="text-gray-700 mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to reverse engineer any software contained in the App</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Account</h2>
              <p className="text-gray-700 mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for safeguarding your account credentials and for any activities or actions 
                under your account.
              </p>
              <p className="text-gray-700 mb-4">
                You must notify us immediately upon becoming aware of any breach of security or unauthorized use 
                of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content</h2>
              <p className="text-gray-700 mb-4">
                Our App allows you to post, link, store, share and make available certain information, text, 
                graphics, photos, or other material. You are responsible for the content that you post to the App.
              </p>
              <p className="text-gray-700 mb-4">
                By posting content to Bloomie AI, you grant us the right and license to use, modify, publicly 
                perform, publicly display, reproduce, and distribute such content on and through the App.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Plant & Pet Care Information</h2>
              <p className="text-gray-700 mb-4">
                The plant and pet care information provided in the App is for general informational purposes only. 
                While we strive to provide accurate information, we make no representations or warranties about the 
                completeness, accuracy, reliability, suitability, or availability of the information.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Important:</strong> For serious pet health concerns, always consult with a licensed 
                veterinarian. Bloomie AI is not a substitute for professional veterinary advice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">You may use the App only for lawful purposes. You agree not to use the App:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit any unsolicited or unauthorized advertising or promotional material</li>
                <li>To impersonate or attempt to impersonate Bloomie AI, another user, or any other person or entity</li>
                <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the App</li>
                <li>To upload viruses or any other malicious code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The App and its original content (excluding user-generated content), features, and functionality 
                are and will remain the exclusive property of Bloomie AI and its licensors. The App is protected 
                by copyright, trademark, and other laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any 
                reason whatsoever, including without limitation if you breach these Terms and Conditions.
              </p>
              <p className="text-gray-700 mb-4">
                Upon termination, your right to use the App will immediately cease. All provisions of the Terms 
                which by their nature should survive termination shall survive termination.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Bloomie AI, nor its directors, employees, partners, agents, suppliers, or 
                affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                The App is provided on an "AS IS" and "AS AVAILABLE" basis. Bloomie AI makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties including, without 
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
                or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                We will provide notice of any changes by posting the new Terms on this page and updating the 
                "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed and construed in accordance with applicable laws, without regard 
                to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li>Email: <a href="mailto:app.bloomiee@gmail.com" className="text-emerald-600 hover:text-emerald-700">app.bloomiee@gmail.com</a></li>
                <li>Facebook: <a href="https://www.facebook.com/profile.php?id=61583344367189" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">Visit our page</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;