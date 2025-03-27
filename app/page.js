import React from "react";
import About from "@/components/about";
import Education from "@/components/education/education";
import Experience from "@/components/experience/experience";
import Header from "@/components/header";
import Projects from "@/components/projects/projects";
import Credits from "@/components/credits";

import { promises as fs } from "fs";
import ThreeJsCube from "@/components/ThreeJsCube";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/public/translations/en.json",
    "utf-8"
  );
  const data = JSON.parse(file);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center py-24 px-6 lg:px-24 z-10 select-none">
        <div className="z-10 w-full max-w-5xl font-mono text-sm flex flex-col lg:flex-row justify-between">
          <Header data={data.general}></Header>
          <div className="lg:pl-[50%] ">
            <div className="p-4">
              <About data={data.general}></About>
              <Experience data={data.experiences}></Experience>
              <Education data={data.education}></Education>
              <Projects data={data.projects}></Projects>
              <Credits data={data.general}></Credits>
            </div>
          </div>
        </div>
      </main>
      <div className="w-full h-full fixed top-0 z-0">
        <ThreeJsCube/>
      </div>
    </>
  );
}
