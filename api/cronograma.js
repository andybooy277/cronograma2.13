export default function handler(req, res) {
  const nowUTC = new Date();
  const now = new Date(nowUTC.getTime() - 3 * 60 * 60 * 1000); // Hora Argentina/Uruguay (GMT-3)

  const eventos = [
    ["Bilbao 🇪🇸", "2025-07-04T19:00:00-03:00"],
    ["La Isla – Asturias 🇪🇸", "2025-07-06T19:00:00-03:00"],
    ["Vigo 🇪🇸", "2025-07-08T19:00:00-03:00"],
    ["Oporto 🇵🇹", "2025-07-10T19:00:00-03:00"],
    ["Fátima 🇵🇹", "2025-07-12T19:00:00-03:00"]
  ];

  let mensaje = "Sin eventos.";

  for (let i = 0; i < eventos.length; i++) {
    const [ciudad, fechaRaw] = eventos[i];
    const inicio = new Date(fechaRaw); // 19:00 AR/UY
    const finDelDia = new Date(inicio);
    finDelDia.setHours(23, 59, 59);

    const diaSiguiente = new Date(inicio);
    diaSiguiente.setDate(diaSiguiente.getDate() + 1);
    diaSiguiente.setHours(0, 0, 0);

    if (now >= inicio && now < diaSiguiente) {
      mensaje = `¡Disfruten del stream en ${ciudad}!`;
      break;
    } else if (now < inicio) {
      const diff = inicio - now;
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const minutos = Math.floor(diff / (1000 * 60)) % 60;
      mensaje = `Próximo stream en ${ciudad}: ${dias}d ${horas}h ${minutos}m a las 19h, AR/UY 🇦🇷🇺🇾`;
      break;
    }
  }

  if (now > new Date("2025-07-12T23:59:59-03:00")) {
    mensaje = "¡Disfruten del stream en Fátima 🇵🇹!";
  }

  res.status(200).send(mensaje);
}