import Image from "next/image";

export default function KwCollectionCard({ collection }: any) {
  return (
    <div className="kwcollection-card">
        <a href="#">
            <span className="black-bg">
                <Image 
                    src={collection.image}
                    alt={collection.name}
                    width={300}
                    height={300}
                    className="mx-auto object-contain"
                />
            </span>
            <h3 className="mt-6 text-[18px] leading-7">
                {collection.name}
            </h3>
        </a>
    </div>    
  );
}
