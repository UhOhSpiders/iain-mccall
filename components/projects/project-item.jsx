import Image from "next/image";

function ProjectItem(props) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col p-5 transition-all bg-surface-200 hover:scale-110 brightness-75 hover:brightness-150 hover:z-10"
    >
      <div className="text-surface-600 mb-4 flex flex-row items-center justify-between">
        <Image
          src={props.image}
          width={800}
          height={500}
          className="items-center"
          alt="Picture of the project"
        />
      </div>
      <h1 className="mb-4 text-xl subpixel-antialiased">{props.name}</h1>
      <div className="text-surface-600 text-xs">{props.description}</div>
    </a>
  );
}

export default ProjectItem;
