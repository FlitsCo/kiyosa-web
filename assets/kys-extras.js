/* Fügt zusätzliche Inhalte in den Framer-Export ein:
   - großer Kursblock "Yoga in Kindergärten, Kitas & Schulen"
   - Block "Kinderyoga auf Geburtstagen"
   - Footer-Links: Kooperation mit Yoga Andrea Heinz + Zertifikate (PDF)
   Framer hydriert die Seite mit React; direkt ins HTML geschriebene Änderungen
   würden dabei wieder verworfen. Deshalb werden die Inhalte hier eingefügt und
   per MutationObserver erneut eingesetzt, falls Framer neu rendert. */
(function () {
  // Website von Yoga Andrea Heinz (Kooperationspartnerin)
  var ANDREA_HEINZ_URL = "https://yoga-andrea-heinz.de/";
  var CERTIFICATES_URL = "/assets/zertifikate.pdf";
  var MAIL = "info@kinderyogamitsabine.com";

  function mailto(subject) {
    return "mailto:" + MAIL + "?subject=" + encodeURIComponent(subject);
  }

  var COURSES_HTML =
    '<div class="kys-extras" data-kys="courses">' +
      '<article class="kys-card kys-card--feature" id="kitas-schulen">' +
        '<span class="kys-eyebrow">Für Einrichtungen</span>' +
        '<h3 class="kys-title">Yoga in Kindergärten, Kitas &amp; Schulen</h3>' +
        '<p class="kys-lead">Ich komme mit meinem Kinderyoga auch direkt zu Ihnen in die Einrichtung. ' +
          'Die Stunden passe ich an Alter, Gruppengröße und Räumlichkeiten an, ob als regelmäßiger Kurs ' +
          'oder als einzelnes Angebot.</p>' +
        '<ul class="kys-list">' +
          '<li>Regelmäßige Yogastunden im Kita- und Schulalltag</li>' +
          '<li>Projekttage &amp; Projektwochen</li>' +
          '<li>Bewegung, Entspannung und Konzentration für die ganze Gruppe</li>' +
        '</ul>' +
        '<a class="kys-cta" href="' + mailto("Anfrage: Yoga in Kita / Schule") + '">Jetzt für Ihre Einrichtung anfragen</a>' +
      '</article>' +
      '<article class="kys-card kys-card--birthday" id="geburtstage">' +
        '<span class="kys-eyebrow">Für besondere Tage</span>' +
        '<h3 class="kys-title">Kinderyoga auf Geburtstagen</h3>' +
        '<p class="kys-lead">Ein Geburtstag voller Bewegung, Spaß und Fantasie: Ich gestalte eine Yogastunde ' +
          'passend zum Alter des Geburtstagskindes und seiner Gäste, mit Yoga-Geschichten, Spielen ' +
          'und einer entspannten Ruhephase zum Abschluss.</p>' +
        '<a class="kys-cta" href="' + mailto("Anfrage: Kinderyoga auf einem Geburtstag") + '">Geburtstag anfragen</a>' +
      '</article>' +
    '</div>';

  var FOOTER_HTML =
    '<p class="kys-footer-links" data-kys="footer">' +
      '<span>In Kooperation mit <a href="' + ANDREA_HEINZ_URL + '" target="_blank" rel="noopener">Yoga Andrea Heinz</a></span>' +
      '<a href="' + CERTIFICATES_URL + '" target="_blank" rel="noopener">Meine Zertifikate (PDF)</a>' +
    '</p>';

  function fromHTML(html) {
    var t = document.createElement("template");
    t.innerHTML = html;
    return t.content.firstChild;
  }

  function ensure() {
    // Kursblöcke unter die bestehenden Kurskarten im Bereich "Meine Kurse"
    var container = document.querySelector("#pricing .framer-hc8x3m");
    if (container && !container.querySelector('[data-kys="courses"]')) {
      container.appendChild(fromHTML(COURSES_HTML));
    }
    // Footer-Links in jeden (sichtbaren) Footer-Variant
    var legals = document.querySelectorAll("footer .framer-q4p4ey");
    for (var i = 0; i < legals.length; i++) {
      if (!legals[i].querySelector('[data-kys="footer"]')) {
        legals[i].insertBefore(fromHTML(FOOTER_HTML), legals[i].firstChild);
      }
    }
  }

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () { scheduled = false; ensure(); });
  }

  function start() {
    ensure();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  }

  // Erst nach dem Laden einfügen, damit Framers Hydrierung nicht über die
  // zusätzlichen Elemente stolpert.
  if (document.readyState === "complete") {
    setTimeout(start, 0);
  } else {
    window.addEventListener("load", function () { setTimeout(start, 0); });
  }
})();
