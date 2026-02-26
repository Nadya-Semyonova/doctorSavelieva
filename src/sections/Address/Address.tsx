import { CONTACTS } from "../../assets/data/contacts";
import Map from "../../shared/ui/Map/Map";

export default function Address() {
  return (
    <section className="address">
      <h2>Адреса</h2>
      <Map src={CONTACTS.mapUrl} />
    </section>
  )
}