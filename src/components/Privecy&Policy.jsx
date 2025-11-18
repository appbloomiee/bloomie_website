import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
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

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: November 18, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Bloomie AI. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our 
                website or use our mobile application and tell you about your privacy rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 mb-4">We may collect, use, store and transfer different kinds of personal data about you:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Identity Data:</strong> Name, username, or similar identifier</li>
                <li><strong>Contact Data:</strong> Email address and telephone numbers</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                <li><strong>Usage Data:</strong> Information about how you use our app and website</li>
                <li><strong>Plant & Pet Data:</strong> Information about your plants and pets that you choose to add to the app</li>
                <li><strong>Photo Data:</strong> Images of plants or pets you upload for identification or tracking purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use your personal data for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To provide and maintain our service</li>
                <li>To identify plants and provide care recommendations</li>
                <li>To send you reminders about watering schedules and pet care tasks</li>
                <li>To improve and personalize your experience</li>
                <li>To communicate with you about updates and features</li>
                <li>To analyze usage patterns and improve our services</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We have implemented appropriate security measures to prevent your personal data from being 
                accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal 
                data to those employees, agents, contractors, and other third parties who have a business need 
                to know.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We will only retain your personal data for as long as necessary to fulfill the purposes we 
                collected it for, including for the purposes of satisfying any legal, accounting, or reporting 
                requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">Under certain circumstances, you have rights under data protection laws in relation to your personal data:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                We may use third-party services for analytics, cloud storage, and AI-powered plant identification. 
                These services have their own privacy policies, and we encourage you to read them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe your 
                child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;