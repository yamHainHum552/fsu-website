// "use client"
// import { useRouter } from "next/navigation"
// import React, { useEffect, useState } from "react"
// import { Montserrat, Roboto, Inter } from "next/font/google"

// import { useSWRConfig } from "swr"
// import NewEventCard from "@/components/NewEventCard"
// import Image from "next/image"
// import Link from "next/link"
// const montserrat = Montserrat({
//   weight: ["100", "300", "500", "600", "700", "800"],
//   subsets: ["latin"],
// })
// const roboto = Roboto({
//   weight: ["100", "300", "500", "700"],
//   subsets: ["latin"],
// })
// const inter = Inter({
//   weight: ["100", "300", "500", "700"],
//   subsets: ["latin"],
// })

// // const fetcher = (url) => fetch(url).then((res) => res.json())

// const EventSlug = ({ params }) => {
//   const [event, setEvent] = useState()
//   // const router = useRouter()
//   // const eventId = router.query.slug

//   // const { data: event = [] } = useSWRConfig(
//   //   `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/admin/event/${eventId}`,
//   //   fetcher,
//   //   { initialData }
//   const { slug } = React.use(params)
//   console.log(slug)
//   // )

//   useEffect(() => {
//     const getEvent = async () => {
//       const res = await fetch(`/api/events/${slug}`)
//         .then((res) => {
//           return res.json()
//         })
//         .then((data) => {
//           setEvent(data)
//           console.log("Data here of this event: ", data)
//         })
//         .catch((err) => {
//           console.log("An error occured. Please check your code", err)
//         })
//     }

//     getEvent()
//   }, [])

//   console.log("Here:", event)

//   const eventDate = event?.data?.date // Likely a string in ISO format
//   const currentDate = new Date() // Current date as a Date object

//   // Convert eventDate to a Date object
//   const eventDateObject = new Date(eventDate)

//   // Compare dates
//   const completedEvent = eventDateObject < currentDate

//   // Format the date
//   const dateOptions = { day: "numeric", month: "long", year: "numeric" }
//   const timeOptions = {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: undefined,
//     hour12: true,
//   } // Format: "2:30 PM"
//   const formattedDate = eventDateObject.toLocaleDateString("en-US", dateOptions)
//   const formattedTime = eventDateObject.toLocaleTimeString("en-US", timeOptions)

//   console.log("Formatted Date:", formattedDate)

//   // return (
//   //   <div className="min-h-[49rem] w-full ">
//   //     Helo
//   //     <div className=" w-full mt-10 flex flex-col items-center">
//   //       <div className="text-center  ">
//   //         <span className="text-4xl font-bold">{event.data.title}</span>
//   //       </div>
//   //       <div
//   //         className="w-[60%] flex flex-col  "
//   //         dangerouslySetInnerHTML={{ __html: event.content }}
//   //       />
//   //     </div>
//   //   </div>
//   // )
//   return (
//     <div
//       className={`card md:w-[80%] w-[98%] mx-auto pb-8 pt-6 md:pb-24 md:pt-16 ${montserrat.className}`}>
//       <div className="card-body p-5">
//         <h2 className="card-title text-3xl font-bold flex gap-5">
//           <Link href="../" className="w-max">
//             <div>
//               <svg
//                 width={40}
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 512 512"
//                 className="cursor-pointer hover:scale-110 duration-300">
//                 <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z" />
//               </svg>
//             </div>
//           </Link>
//           <p className="">{event?.data?.title}</p>
//         </h2>
//         <div className="flex md:flex-row flex-col gap-5">
//           <p className="md:text-[13px] text-[11px] font-normal">
//             Event Date: {formattedDate}
//           </p>
//           <p className="md:text-[13px] text-[11px] font-normal">
//             Event Time: {formattedTime}
//           </p>
//         </div>
//         <div
//           className={`badge md:text-[13px] text-[9px] text-white ${
//             completedEvent ? "badge-warning" : "badge-success"
//           }`}>{`${completedEvent ? "COMPLETED" : "UPCOMING"}`}</div>
//       </div>
//       <figure>
//         {event?.data?.thumbnail_url && (
//           <Image
//             src={`${event?.data?.thumbnail_url}`}
//             width={500}
//             height={500}
//             alt={event?.data?.title || "Image"}
//             className="object-contain"
//           />
//         )}
//       </figure>
//       <p className="my-5 pl-3 md:text-[20px] text-[15px]">
//         {event?.data?.content}
//       </p>
//       <hr />
//       <div className="pl-3 my-5 md:text-[20px] text-[12px] flex flex-col gap-3">
//         <p className="flex flex-row items-center gap-2">
//           <span>
//             <svg
//               viewBox="0 0 15 15"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18">
//               <path
//                 d="M3.5 0v5m8-5v5M5 8.5l2 2 3.5-4m-9-4h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"
//                 stroke="currentColor"></path>
//             </svg>
//           </span>
//           : 20 December
//         </p>
//         <p className="flex flex-row gap-2 items-center md:text-[20px] text-[12px]">
//           <span>
//             <svg
//               viewBox="0 0 15 15"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18">
//               <path
//                 d="M7.5 7.5H7a.5.5 0 00.146.354L7.5 7.5zm0 6.5A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zM14 7.5A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0zM7 3v4.5h1V3H7zm.146 4.854l3 3 .708-.708-3-3-.708.708z"
//                 fill="currentColor"></path>
//             </svg>
//           </span>
//           : 12:05 AM
//         </p>
//         <p className="md:text-[20px] text-[12px]">
//           Register:{" "}
//           <Link href={event?.data?.registration || "/"} className="underline">
//             Click here
//           </Link>
//         </p>
//         <p className="md:text-[20px] text-[12px]">
//           Images from the event: gallery link (if event has been completed)
//         </p>
//       </div>

//       {/* <NewEventCard /> */}
//     </div>
//   )
// }

// export default EventSlug

// // export async function getServerSideProps(context) {
// //   const projectId = context.query.slug
// //   const initialData = await fetcher(
// //     `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/admin/project/${projectId}`
// //   )
// //   return { props: { initialData } }
// // }

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

const montserrat = Montserrat({
  weight: ["100", "300", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const EventSlug = ({ params }) => {
  const [event, setEvent] = useState();
  const { slug } = React.use(params);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await fetch(`/api/events/${slug}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.log("An error occurred. Please check your code", err);
      }
    };
    getEvent();
  }, [slug]);

  const eventDate = event?.data?.date;
  const currentDate = new Date();
  const eventDateObject = new Date(eventDate);
  const completedEvent = eventDateObject < currentDate;

  const dateOptions = { day: "numeric", month: "long", year: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedDate = eventDateObject.toLocaleDateString(
    "en-US",
    dateOptions
  );
  const formattedTime = eventDateObject.toLocaleTimeString(
    "en-US",
    timeOptions
  );

  return (
    <main className={`max-w-4xl mx-auto px-4 py-8 ${montserrat.className}`}>
      {/* Header Section */}
      <div className="mb-8">
        <Link
          href="../"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to Events</span>
        </Link>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {event?.data?.title}
          </h1>

          <div className="flex flex-wrap gap-4 items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                completedEvent ? "bg-yellow-500" : "bg-green-600"
              }`}
            >
              {completedEvent ? "COMPLETED" : "UPCOMING"}
            </span>

            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{formattedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      {event?.data?.thumbnail_url && (
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={event.data.thumbnail_url}
            alt={event.data.title || "Event Image"}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700">{event?.data?.content}</p>
      </div>

      {/* Details Section */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>

        <div className="space-y-3">
          {event?.data?.registration && (
            <div className="flex items-center">
              <ExternalLink className="w-5 h-5 mr-3 text-gray-600" />
              <div>
                <span className="text-gray-600 mr-2">Registration:</span>
                <Link
                  href={event.data.registration}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  target="_blank"
                >
                  Register Now
                </Link>
              </div>
            </div>
          )}

          {completedEvent && (
            <div className="flex items-center">
              <ImageIcon className="w-5 h-5 mr-3 text-gray-600" />
              <div>
                <span className="text-gray-600 mr-2">Event Gallery:</span>
                <Link
                  href="/gallery"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  View Photos
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default EventSlug;
