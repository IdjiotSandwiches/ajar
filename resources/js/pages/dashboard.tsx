import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, PlayCircle } from "lucide-react";
import LMSLayout from "@/layouts/lms-layout";
import { router } from "@inertiajs/react";
import MobileReminder from "@/components/lms/mobile-reminder";

export default function StudentDashboard() {

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 4 && hour < 11) return "Good Morning";
    if (hour >= 11 && hour < 15) return "Good Afternoon";
    if (hour >= 15 && hour < 19) return "Good Evening";
    return "Good Night";
  };

  const greeting = getGreeting();

  const todayClasses: any[] = [
    {
      title: "Physics - Chapter 5",
      time: "09:00 - 10:00",
      teacher: "Mr. Daniel",
      meetingUrl: "#",
    },
    {
      title: "Mathematics - Algebra",
      time: "11:00 - 12:00",
      teacher: "Ms. Erika",
      meetingUrl: "#",
    },
    {
      title: "Mathematics - Algebra",
      time: "11:00 - 12:00",
      teacher: "Ms. Erika",
      meetingUrl: "#",
    },
  ];

  const upcomingClasses: any[] = [
    {
      title: "Biology - Cell Division",
      time: "Tomorrow · 10:00",
      teacher: "Mr. James",
    },
    {
      title: "English - Grammar",
      time: "Tomorrow · 13:00",
      teacher: "Mrs. Alice",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">My Dashboard</h1>
      <Card className="bg-[#3ABEFF]/10 border-none shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#3ABEFF]">{greeting}!</h2>
            <p className="text-sm text-[#3ABEFF] mt-2 max-w-lg">
              "Education is not the learning of facts, but the training of the mind to think."
            </p>
          </div>
          <img
            src="https://illustrations.popsy.co/blue/student.svg"
            className="w-40"
          />
        </CardContent>
      </Card>

      <div className="md:hidden">
        <MobileReminder />
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-sm border-none">
          <CardContent>
            <h3 className="font-semibold text-lg mb-4">Today Classes</h3>

            {todayClasses.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
                <p className="font-medium text-gray-700 mb-1">No classes today</p>
                <p className="text-sm mb-4 max-w-xs">
                  You don’t have any scheduled classes today. Enroll a course to start learning!
                </p>

                <p
                  className="bg-[#3ABEFF] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3ABEFF]/90 transition"
                  onClick={() => router.get(route('list-course', { category_id: 1 }))}
                >
                  Enroll Now
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {todayClasses.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border"
                  >
                    <div>
                      <span className="font-medium">{item.title}</span>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock size={14} /> {item.time}
                      </div>
                      <span className="text-sm text-gray-500">{item.teacher}</span>
                    </div>

                    <a
                      href={item.meetingUrl}
                      className="flex items-center gap-2 bg-[#3ABEFF] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3ABEFF]/90 transition"
                    >
                      <PlayCircle size={16} />
                      Join
                    </a>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>


        <Card className="rounded-2xl shadow-sm border-none">
          <CardContent>
            <h3 className="font-semibold text-lg mb-4">Upcoming Classes</h3>

            {upcomingClasses.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
                <p className="font-medium text-gray-700 mb-1">No upcoming classes</p>
                <p className="text-sm mb-4 max-w-xs">
                  You don’t have any upcoming classes. Start exploring new courses now!
                </p>

                <p
                  className="bg-[#3ABEFF] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3ABEFF]/90 transition"
                  onClick={() => router.get(route('list-course', { category_id: 1 }))}
                >
                  Browse Courses
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {upcomingClasses.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white rounded-xl shadow-sm border"
                  >
                    <span className="font-medium">{item.title}</span>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar size={14} /> {item.time}
                    </div>
                    <span className="text-sm text-gray-500">{item.teacher}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

StudentDashboard.layout = (page: React.ReactNode) => <LMSLayout title="My Dashboard">{page}</LMSLayout>;
