import BackButton from '@/components/ui/back-button';
import { router } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
  title?: string;
  step?: number;
}

export default function AuthSimpleLayout({ children, title, step = 0 }: PropsWithChildren<AuthLayoutProps>) {
  const isFullPage = step > 2; // 👉 langkah 3 ke atas (TeacherDetailForm)

  return (
    <div className="flex flex-col items-start min-h-screen bg-[#F8FEFF] p-6">
      {/* <BackButton className="m-4" label="Back" /> */}

      <div className="flex flex-1 w-full items-center justify-center"> 
        {!isFullPage ? (
          <div className="bg-white flex w-[70%] max-w-5xl rounded-2xl shadow-sm overflow-hidden">
            {/* Left section */}
            <div className="w-1/2 flex flex-col items-center justify-center p-10 text-center">
              <div className="text-[#3ABEFF] mb-4">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.8558 47.8341V59.1442H16.1659L49.5231 25.7568L38.213 14.4467L4.8558 47.8341ZM64 51.1819L51.1819 64L35.4986 48.3167L40.8369 42.9783L43.853 45.9943L51.3025 38.5146L55.5853 42.7974L51.1819 47.0801L54.3789 50.0961L58.6616 45.8737L64 51.1819ZM15.7436 28.4713L0 12.8181L12.8181 0L18.1263 5.33836L10.6767 12.8181L13.9039 16.0151L21.3233 8.53534L25.606 12.8181L21.3233 17.0707L24.3393 20.0867L15.7436 28.4713ZM58.2696 16.9199C59.4458 15.7436 59.4458 13.9039 58.2696 12.6673L51.2121 5.73044C50.0961 4.55419 48.1357 4.55419 46.9595 5.73044L41.41 11.2498L52.7201 22.5598L58.2696 16.9199Z"
                    fill="#42C2FF"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#3ABEFF] mb-2">Technology</h2>
              <p className="text-[#3ABEFF] text-sm leading-relaxed max-w-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>

            {/* Right section */}
            <div className="w-1/2 flex flex-col justify-center px-12 py-10 max-w-md">
              <h1 className="text-3xl font-semibold text-center text-[#3ABEFF] mb-8">{title}</h1>
              {children}
            </div>
          </div>
        ) : (
          // === FULL PAGE MODE ===
          <div className="bg-white w-[85%] max-w-6xl rounded-2xl shadow-sm px-16 py-12">
            <h1 className="text-3xl font-semibold text-center text-[#3ABEFF] mb-8">{title}</h1>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
