import Image, { StaticImageData } from "next/image";
import "./MemberCard.css";
import OpenVideoButton from "./OpenVideoButton";
type MemberCardProps = {
  memberImage: StaticImageData;
  name: string;
  jop: string;
};
const MemberCard = ({ memberImage, name, jop }: MemberCardProps) => {
  return (
    <div className="member rounded-md relative">
      <div className="image rounded-md h-full overflow-hidden">
        <Image src={memberImage} alt="member" width={400} height={500} className="rounded-md h-full object-contain hover:scale-110 ease" style={{ width: "auto" }} sizes="(max-width: 768px) 100vw, 400px" />
      </div>
      <div className="absolute  bottom-0 left-0 right-0 flex justify-between items-center">
        <div className="member-info  p-4  rounded-b-md z-[15]">
          <h4 className="text-[18px] font-bold text-white">{name}</h4>
          <p className=" text-[#e0e0e0] text-sm">{jop}</p>
        </div>
        <OpenVideoButton vid={"cat_farmer.mp4"} />
      </div>
    </div>
  );
};

export default MemberCard;
