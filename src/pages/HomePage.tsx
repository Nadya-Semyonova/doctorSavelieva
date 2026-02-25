import About from "../sections/About/About";
import Address from "../sections/Address/Address";
import Appointment from "../sections/Appointment/Appointment";
import Benefit from "../sections/Benefit/Benefit";
import Hero from "../sections/Hero/Hero";
import Links from "../sections/Links/Links";
import Reviews from "../sections/Reviews/Reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Benefit />
      <Appointment />
      <Reviews />
      <Links />
      <Address />
    </>
  );
}
