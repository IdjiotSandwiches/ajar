import { router } from "@inertiajs/react";
import TeacherProfileCard from "../teacher/card";

export default function CourseSidebar({ teacher, institute }: { teacher: any[], institute: any }) {
  return (
    <aside className="space-y-6">

      {/* Institution */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Institution</h3>
        <div
          className="bg-[#3ABEFF] rounded-2xl shadow-lg p-1 cursor-pointer"
          onClick={() => router.get(route("detail-institute", { id: institute.id }))}
        >
          <div className="bg-white p-0.5 rounded-2xl">
            <div className="bg-[#3ABEFF] rounded-2xl p-2 flex items-center text-center relative overflow-hidden gap-4">
              <img src={institute.profile_picture || null} alt="ins" className="w-12 h-12 rounded-full border-2" />
              <span className="font-medium text-white">{institute.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Card */}
      {/* <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Teachers</h3>
        {teacher === null ? <p className="font-medium">No teacher yet|</p> : <TeacherProfileCard teacher={teacher}/>}
      </div> */}

    </aside>
  );
}
