import { CONTACTS } from "../../shared/config/contacts";
import Map from "../../shared/ui/Map/Map";

export default function Address() {
  return (
    <section className="address">
      <h2>Адреса</h2>
      <Map src={CONTACTS.mapUrl} />
    </section>
  )
}