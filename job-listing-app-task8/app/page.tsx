import Image from "next/image";
import Jobs from "./jobs/page";
import getServerSession from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);
  console.log("Session from server:", session);
  if (!session) {
    redirect("/login");
  }
  return (
    <div> 
      <Jobs />
    </div>
  )
}
