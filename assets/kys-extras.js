/* Fügt zusätzliche Inhalte in den Framer-Export ein:
   - Abschnitt "Yoga in Kindergärten, Kitas & Schulen"
   - Abschnitt "Kinderyoga auf Geburtstagen"
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

  // Grüner Aufzählungspunkt aus den bestehenden Kurskarten
  var BULLET = "/framerusercontent.com/images/87Y7tVHLu1HFgAMv0SOO84uLhvw.png";

  // Typografie über die Framer-Presets der Seite:
  // r13rvo = Abschnittstitel (h2), wgt0c4 = Untertitel / Fließtext,
  // 1y6bbf9 = Kartentitel (h6), sbv1ox = Kurstitel (h5),
  // 1qqjgtp = Listeneintrag, ty8qwo = kleiner Text
  function h2(text) {
    return '<h2 class="framer-text framer-styles-preset-r13rvo" style="--framer-text-alignment:center">' + text + '</h2>';
  }
  function sub(text) {
    return '<p class="framer-text framer-styles-preset-wgt0c4" style="--framer-text-alignment:center">' + text + '</p>';
  }
  function li(text) {
    return '<li><img src="' + BULLET + '" alt=""><p class="framer-text framer-styles-preset-1qqjgtp">' + text + '</p></li>';
  }
  function contactItem(label, value, href) {
    return '<div class="kys-contact-item">' +
      '<p class="framer-text framer-styles-preset-1qqjgtp">' + label + '</p>' +
      '<p class="framer-text framer-styles-preset-ty8qwo"><a href="' + href + '">' + value + '</a></p>' +
    '</div>';
  }

  var COURSES_HTML =
    '<section class="kys-section framer-ScQV4" id="kitas-schulen" data-kys="courses">' +
      '<div class="kys-container">' +
        '<div class="kys-titles">' +
          h2('Yoga in Kindergärten, Kitas &amp; Schulen') +
          sub('Ich komme mit meinem Kinderyoga auch direkt zu Ihnen in die Einrichtung.') +
        '</div>' +
        '<div class="kys-row">' +
          '<div class="kys-card kys-card--wide">' +
            '<h6 class="framer-text framer-styles-preset-1y6bbf9">Mein Angebot für Einrichtungen</h6>' +
            '<p class="framer-text framer-styles-preset-wgt0c4">Die Stunden passe ich an Alter, Gruppengröße und ' +
              'Räumlichkeiten an, ob als regelmäßiger Kurs oder als einzelnes Angebot.</p>' +
            '<ul class="kys-list">' +
              li('Regelmäßige Yogastunden im Kita- und Schulalltag') +
              li('Projekttage &amp; Projektwochen') +
              li('Bewegung, Entspannung und Konzentration für die ganze Gruppe') +
            '</ul>' +
          '</div>' +
          '<div class="kys-card kys-card--side">' +
            '<h6 class="framer-text framer-styles-preset-1y6bbf9">Anfrage für Ihre Einrichtung</h6>' +
            '<div class="kys-contact">' +
              contactItem('Email', MAIL, mailto('Anfrage: Yoga in Kita / Schule')) +
              contactItem('Telefon/Whatsapp', '0160 1762127', 'tel:+491601762127') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +
    '<section class="kys-section framer-ScQV4" id="geburtstage" data-kys="birthday">' +
      '<div class="kys-container">' +
        '<div class="kys-titles">' +
          h2('Kinderyoga auf Geburtstagen') +
          sub('Ein Geburtstag voller Bewegung, Spaß und Fantasie.') +
        '</div>' +
        '<div class="kys-row">' +
          '<div class="kys-card kys-card--wide">' +
            '<h6 class="framer-text framer-styles-preset-1y6bbf9">Die Yoga-Geburtstagsparty</h6>' +
            '<p class="framer-text framer-styles-preset-wgt0c4">Ich gestalte eine Yogastunde passend zum Alter ' +
              'des Geburtstagskindes und seiner Gäste, mit Yoga-Geschichten, Spielen und einer entspannten ' +
              'Ruhephase zum Abschluss.</p>' +
          '</div>' +
          '<div class="kys-card kys-card--side">' +
            '<h6 class="framer-text framer-styles-preset-1y6bbf9">Geburtstag anfragen</h6>' +
            '<div class="kys-contact">' +
              contactItem('Email', MAIL, mailto('Anfrage: Kinderyoga auf einem Geburtstag')) +
              contactItem('Telefon/Whatsapp', '0160 1762127', 'tel:+491601762127') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';

  var FOOTER_HTML =
    '<p class="framer-text framer-styles-preset-ty8qwo kys-footer-links" data-kys="footer">' +
      '<span>In Kooperation mit <a class="framer-text framer-styles-preset-1poaa84" href="' + ANDREA_HEINZ_URL + '" target="_blank" rel="noopener">Yoga Andrea Heinz</a></span>' +
      '<a class="framer-text framer-styles-preset-1poaa84" href="' + CERTIFICATES_URL + '" target="_blank" rel="noopener">Meine Zertifikate (PDF)</a>' +
    '</p>';

  function fromHTML(html) {
    var t = document.createElement("template");
    t.innerHTML = html;
    return t.content;
  }

  function ensure() {
    // Eigene Abschnitte direkt nach "Meine Kurse"
    var pricing = document.getElementById("pricing");
    if (pricing && !document.querySelector('[data-kys="courses"]')) {
      pricing.parentNode.insertBefore(fromHTML(COURSES_HTML), pricing.nextSibling);
    }
    // Footer-Links in jeden Footer-Variant
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
