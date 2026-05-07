export function MapView() {
  return (
    <iframe
      title="Katina's Kafé Location"
      width="100%"
      height="100%"
      style={{ border: 0, minHeight: '100%' }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src="https://maps.google.com/maps?q=Katina's%20Kaf%C3%A9,%2031%20KG%208%20Ave,%20Kigali&hl=en&z=16&output=embed"
    ></iframe>
  );
}

