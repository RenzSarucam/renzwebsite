type Props = { slug: string; title: string; image: string };

export default function DeviceMockup({ slug, title, image }: Props) {
  const screenshot = <img src={image} alt={`${title} — screenshot`} loading="lazy" />;

  if (slug === "qrgen" || slug === "truenest-seekers-mobile-design") {
    return (
      <div className={`device-scene device-scene-phone device-scene-${slug}`}>
        <div className="mock-phone">
          <span className="mock-phone-buttons" aria-hidden="true" />
          <div className="mock-phone-screen">
            {screenshot}
            <span className="mock-phone-island" aria-hidden="true"><i /></span>
            <span className="mock-phone-home" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }

  if ([
    "keycloak", "opsora", "crisismesh", "gap-finder", "bip-and-sls", "mrs",
    "epa", "pmes", "bookstack", "gems", "gtms", "wpi", "e-jo",
    "inventory-count-management-system", "web-idc", "schedulelink", "reorderpro",
    "truenest-seekers-website-design",
  ].includes(slug)) {
    return (
      <div className={`device-scene device-scene-${slug}`}>
        <div className="mock-laptop">
          <div className="mock-laptop-lid">
            <div className="mock-laptop-display">{screenshot}</div>
            <span className="mock-laptop-camera" aria-hidden="true" />
          </div>
          <div className="mock-laptop-hinge" aria-hidden="true" />
          <div className="mock-laptop-deck" aria-hidden="true">
            <div className="mock-keyboard">
              {Array.from({ length: 56 }, (_, i) => <span key={i} />)}
              <span className="mock-spacebar" />
            </div>
            <span className="mock-trackpad" />
          </div>
          <div className="mock-laptop-edge" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return screenshot;
}
