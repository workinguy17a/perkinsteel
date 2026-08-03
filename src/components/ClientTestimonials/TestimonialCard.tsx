import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  image: string;
  rating: number;
  review: string;
}

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div className="testi-wrap">
        <p>
            {testimonial.review}
        </p>
          <span className="font-semibold">{testimonial.name}</span>      
    </div>
  );
}