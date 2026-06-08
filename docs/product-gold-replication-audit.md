# Product Gold Replication Audit

Generated: 2026-06-07T11:06:37.906Z

Scope: audit only. No product data, routes, sitemap, indexation, imports or deployment were modified.

## Summary

- Products audited: 500
- A = publish ready: 126
- B = minor fixes: 43
- C = title/slug repair needed: 87
- D = not acceptable: 244

## Recommendation

- Can this batch be deployed? No. Too many title/slug quality issues remain.
- Can this batch be indexed? No. Keep products noindex until all C/D issues are repaired and B count is reduced.

Practical recommendation: do not index this 500-product batch yet. Use the audit below to repair C/D first, then reduce B items with obvious title/slug polish before any production/indexation phase.

## Categories With Most Issues

| Category | Total | A | B | C | D | Issue score | Top issue types |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Mobilier medical | 138 | 29 | 33 | 25 | 51 | 4798 | category_driven_title: 89; slug_contains_english: 65; untranslated_fragment: 55; awkward_romanian: 21 |
| Diagnostic | 60 | 10 | 1 | 7 | 42 | 3016 | awkward_romanian: 46; generic_title_start: 45; category_driven_title: 45; slug_contains_english: 6 |
| Monitorizare | 48 | 12 | 0 | 0 | 36 | 2436 | generic_title_start: 36; category_driven_title: 36; awkward_romanian: 36; slug_contains_english: 6 |
| Ingrijire pacient | 41 | 2 | 0 | 4 | 35 | 2346 | awkward_romanian: 39; generic_title_start: 32; category_driven_title: 32; slug_contains_english: 8 |
| Urgenta | 52 | 14 | 3 | 4 | 31 | 2106 | awkward_romanian: 33; generic_title_start: 30; category_driven_title: 30; slug_contains_english: 7 |
| Sterilizare | 27 | 11 | 0 | 0 | 16 | 1156 | generic_title_start: 16; category_driven_title: 16; awkward_romanian: 15; placeholder_title: 6 |
| Laborator / IVD | 22 | 5 | 0 | 2 | 15 | 1016 | generic_title_start: 16; category_driven_title: 16; awkward_romanian: 15; untranslated_fragment: 1 |
| Cantare si masurare | 66 | 28 | 4 | 31 | 3 | 980 | generic_title_start: 33; slug_contains_english: 4; awkward_romanian: 3; placeholder_title: 2 |
| Ginecologie | 8 | 0 | 2 | 0 | 6 | 444 | generic_title_start: 6; category_driven_title: 6; awkward_romanian: 6; slug_contains_english: 2 |
| ORL | 10 | 4 | 0 | 1 | 5 | 330 | awkward_romanian: 6; generic_title_start: 5; category_driven_title: 5 |
| Electromedicale | 12 | 1 | 0 | 9 | 2 | 320 | generic_title_start: 11; placeholder_title: 2 |
| Instrumentar chirurgical | 4 | 0 | 0 | 2 | 2 | 160 | category_driven_title: 4; slug_contains_english: 4; repeated_words: 2 |
| Lampi medicale | 12 | 10 | 0 | 2 | 0 | 40 | awkward_romanian: 2 |

## Worst 100 Titles

| # | Grade | Category | Code | Title | Issues | URL |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | D | Diagnostic | 32809 | Echipament de Diagnostic Adult Manseta - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-diagnostic-adult-cuff-spare-32809 |
| 2 | D | Monitorizare | 35124 | Echipament de Monitorizare 35135 Reusable Adult Spo2 Sonda - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-monitorizare-35135-reusable-adult-spo2-sonda-rezerva-35124 |
| 3 | D | Monitorizare | 35132 | Echipament de Monitorizare 35135 Reusable Adult Spo2 Sonda - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-monitorizare-35135-reusable-adult-spo2-sonda-rezerva-35132 |
| 4 | D | Monitorizare | 35135 | Echipament de Monitorizare Adult Spo2 Sonda - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-monitorizare-adult-spo2-sonda-rezerva-35135 |
| 5 | D | Monitorizare | 35139 | Echipament de Monitorizare Nibp Manseta 21-35 Cm - Adult - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-monitorizare-nibp-manseta-21-35-cm-adult-rezerva-35139 |
| 6 | D | Urgenta | 35105 | Echipament de Urgenta Adult Sonda >40 Kg - Reusable - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-urgenta-adult-probe-40-kg-reusable-spare-35105 |
| 7 | D | Ginecologie | 29511 | Produs pentru Ginecologie On/off Membrane Switch pentru Code 29502 | starts generic, category-driven title, placeholder-style title, awkward Romanian, repeated words | http://localhost:3000/produse/produs-pentru-ginecologie-on-off-membrane-switch-pentru-code-29502-29511 |
| 8 | D | Ingrijire pacient | 28502 | Produs pentru Ingrijire Pacient PVC Water Mattress | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/produs-pentru-ingrijire-pacient-pvc-water-mattress-28502 |
| 9 | D | Diagnostic | 33621 | Echipament de Diagnostic Adaptor de Izolare pentru Casti pentru Conductie Aeriana* | starts generic, category-driven title, awkward Romanian, repeated words, slug contains English | http://localhost:3000/produse/echipament-de-diagnostic-insulation-device-pentru-air-conduction-phone-33621 |
| 10 | D | Diagnostic | 31788 | Echipament de Diagnostic Heine 130 Bulb 2.5v - Piesa de Schimb pentru 31745 | starts generic, category-driven title, placeholder-style title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-heine-130-bulb-2-5v-piesa-de-schimb-pentru-31745-31788 |
| 11 | D | Sterilizare | 35610 | Echipament de Sterilizare Gimette 28 35611 35615 35639 | starts generic, category-driven title, placeholder-style title, awkward Romanian | http://localhost:3000/produse/echipament-de-sterilizare-gimette-28-35611-35615-35639-35610 |
| 12 | D | Sterilizare | 35614 | Echipament de Sterilizare Gimette 28 35611 35615 35639 | starts generic, category-driven title, placeholder-style title, awkward Romanian | http://localhost:3000/produse/echipament-de-sterilizare-gimette-28-35611-35615-35639-35614 |
| 13 | D | Sterilizare | 35639 | Echipament de Sterilizare Gimette 28 35611 35615 35639 | starts generic, category-driven title, placeholder-style title, awkward Romanian | http://localhost:3000/produse/echipament-de-sterilizare-gimette-28-35611-35615-35639-35639 |
| 14 | D | Sterilizare | 35611 | Echipament de Sterilizare Gimette 50* - 35617 35639 | starts generic, category-driven title, placeholder-style title, awkward Romanian | http://localhost:3000/produse/echipament-de-sterilizare-gimette-50-35617-35639-35611 |
| 15 | D | Sterilizare | 35615 | Echipament de Sterilizare Gimette 50* - 35617 35639 | starts generic, category-driven title, placeholder-style title, awkward Romanian | http://localhost:3000/produse/echipament-de-sterilizare-gimette-50-35617-35639-35615 |
| 16 | D | Mobilier medical | 27520 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27520 |
| 17 | D | Mobilier medical | 27521 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27521 |
| 18 | D | Mobilier medical | 27522 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27522 |
| 19 | D | Mobilier medical | 27524 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27524 |
| 20 | D | Mobilier medical | 27525 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27525 |
| 21 | D | Mobilier medical | 27526 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English | http://localhost:3000/produse/mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27526 |
| 22 | D | Diagnostic | 53551 | Echipament de Diagnostic Amplivox 240 Diagnostic Audiometer - Air, Bone, | starts generic, category-driven title, awkward Romanian, repeated words | http://localhost:3000/produse/echipament-de-diagnostic-amplivox-240-diagnostic-audiometer-air-bone-53551 |
| 23 | D | Diagnostic | 32775 | Echipament de Diagnostic Measuring Range - Pressure: 0-300 Mmhg ±3 Mmhg | starts generic, category-driven title, awkward Romanian, repeated words | http://localhost:3000/produse/echipament-de-diagnostic-measuring-range-pressure-0-300-mmhg-3-mmhg-32775 |
| 24 | D | Diagnostic | 33624 | Echipament de Diagnostic Sibelsound 400-aom Diagnostic Audiometer | starts generic, category-driven title, awkward Romanian, repeated words | http://localhost:3000/produse/echipament-de-diagnostic-sibelsound-400-aom-diagnostic-audiometer-33624 |
| 25 | D | Sterilizare | 35928 | Echipament de Sterilizare GD-301 Evo Sealing Machine - Machine Doar | starts generic, category-driven title, awkward Romanian, repeated words | http://localhost:3000/produse/echipament-de-sterilizare-gd-301-evo-sealing-machine-machine-doar-35928 |
| 26 | D | Ingrijire pacient | 43121 | Produs pentru Ingrijire Pacient Elbow Crutches Advance Elbow Crutches | starts generic, category-driven title, awkward Romanian, repeated words | http://localhost:3000/produse/produs-pentru-ingrijire-pacient-elbow-crutches-advance-elbow-crutches-43121 |
| 27 | D | Ingrijire pacient | 43153 | Produs pentru Ingrijire Pacient Pedalier pentru Exercitii | starts generic, category-driven title, awkward Romanian, repeated words | http://localhost:3000/produse/produs-pentru-ingrijire-pacient-pedalier-pentru-exercitii-43153 |
| 28 | D | Diagnostic | 35193 | Echipament de Diagnostic Manseta 22-35 Cm - Piesa de Schimb | starts generic, category-driven title, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-diagnostic-cuff-22-35-cm-piesa-de-schimb-35193 |
| 29 | D | Diagnostic | 32900 | Echipament de Diagnostic Mare "superb" Manseta 2 Tubes - 34-43 Cm* | starts generic, category-driven title, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-diagnostic-mare-superb-cuff-2-tubes-34-43-cm-32900 |
| 30 | D | Monitorizare | 33316 | Echipament de Monitorizare Contec 8000 fara Fir ECG Workstation | starts generic, category-driven title, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-monitorizare-contec-8000-wireless-ecg-workstation-33316 |
| 31 | D | Monitorizare | 33990 | Echipament de Monitorizare Sonde Dp-50, Dp-50 Expert, | starts generic, category-driven title, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-monitorizare-probes-dp-50-dp-50-expert-33990 |
| 32 | D | Urgenta | 23525 | Echipament de Urgenta Ihealth Air - fara Fir | starts generic, category-driven title, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-urgenta-ihealth-air-wireless-23525 |
| 33 | D | Urgenta | 35095 | Echipament de Urgenta Oxy-10 Multifunctional Oximeter - fara Fir | starts generic, category-driven title, awkward Romanian, slug contains English | http://localhost:3000/produse/echipament-de-urgenta-oxy-10-multifunctional-oximeter-wireless-35095 |
| 34 | D | Ingrijire pacient | 43191 | Produs pentru Ingrijire Pacient Comfort Scaun cu Functie Toaleta | starts generic, category-driven title, awkward Romanian, slug contains English | http://localhost:3000/produse/produs-pentru-ingrijire-pacient-comfort-commode-43191 |
| 35 | D | Ingrijire pacient | 43193 | Produs pentru Ingrijire Pacient Scaun cu Functie Toaleta si Shower | starts generic, category-driven title, awkward Romanian, slug contains English | http://localhost:3000/produse/produs-pentru-ingrijire-pacient-commode-si-shower-43193 |
| 36 | D | Sterilizare | 35670 | Echipament de Sterilizare * Heating Band Dxb A835 For 35658, 35659, 35660 | starts generic, category-driven title, placeholder-style title | http://localhost:3000/produse/echipament-de-sterilizare-heating-band-dxb-a835-for-35658-35659-35660-35670 |
| 37 | D | Mobilier medical | 43466 | Mobilier Medical Sling - L - Nylon 350 1150 650 1300 | category-driven title, placeholder-style title, awkward Romanian | http://localhost:3000/produse/mobilier-medical-sling-l-nylon-350-1150-650-1300-43466 |
| 38 | D | Mobilier medical | 43469 | Mobilier Medical Sling - L - Nylon 350 950 650 1300 | category-driven title, placeholder-style title, awkward Romanian | http://localhost:3000/produse/mobilier-medical-sling-l-nylon-350-950-650-1300-43469 |
| 39 | D | Mobilier medical | 43468 | Mobilier Medical Sling - M - Nylon 350 800 650 1200 | category-driven title, placeholder-style title, awkward Romanian | http://localhost:3000/produse/mobilier-medical-sling-m-nylon-350-800-650-1200-43468 |
| 40 | D | Mobilier medical | 43465 | Mobilier Medical Sling - M - Nylon 350 920 560 1050 | category-driven title, placeholder-style title, awkward Romanian | http://localhost:3000/produse/mobilier-medical-sling-m-nylon-350-920-560-1050-43465 |
| 41 | D | Diagnostic | 32158 | Echipament de Diagnostic 10801-532 de Unica Folosinta Ear Speculum Ø 2 Mm - Cutie cu 10 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-10801-532-de-unica-folosinta-ear-speculum-2-mm-cutie-cu-10-32158 |
| 42 | D | Diagnostic | 32175 | Echipament de Diagnostic Charging Cradle pentru Video Otoscop Ms | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-charging-cradle-pentru-video-otoscop-ms-32175 |
| 43 | D | Diagnostic | 32174 | Echipament de Diagnostic Charging Cradle pentru Video Otoscop Ms102 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-charging-cradle-pentru-video-otoscop-ms102-32174 |
| 44 | D | Diagnostic | 32745 | Echipament de Diagnostic Dayton Sphygmo - Desk/wall Model | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-dayton-sphygmo-desk-wall-model-32745 |
| 45 | D | Diagnostic | 32171 | Echipament de Diagnostic Deluxe Pack Ms102 - 4 Cameras | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-deluxe-pack-ms102-4-cameras-32171 |
| 46 | D | Diagnostic | 32154 | Echipament de Diagnostic Dermatoscop Lens | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-dermatoscop-lens-32154 |
| 47 | D | Diagnostic | 31755 | Echipament de Diagnostic Digital Wi-fi Iriscope cu Software si Suport | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-digital-wi-fi-iriscope-cu-software-si-stand-31755 |
| 48 | D | Diagnostic | 32179 | Echipament de Diagnostic Digital Wi-fi Iriscope cu Software si Suport | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-digital-wi-fi-iriscope-cu-software-si-stand-32179 |
| 49 | D | Diagnostic | 32163 | Echipament de Diagnostic Elite Pack Ms102 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-elite-pack-ms102-32163 |
| 50 | D | Diagnostic | 32155 | Echipament de Diagnostic General Lens | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-general-lens-32155 |
| 51 | D | Diagnostic | 31745 | Echipament de Diagnostic Heine Beta 200 Retinoscop - cu Fanta - 2.5 V - C-034.10.118 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-heine-beta-200-retinoscop-cu-fanta-2-5-v-c-034-10-118-31745 |
| 52 | D | Diagnostic | 53557 | Echipament de Diagnostic Insert pentru Masking | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-insert-pentru-masking-53557 |
| 53 | D | Diagnostic | 32902 | Echipament de Diagnostic Leo Electronic Sphygmomanometeet R - cu Software | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-leo-electronic-sphygmomanometeet-r-cu-software-32902 |
| 54 | D | Diagnostic | 53549 | Echipament de Diagnostic Maico Ma27 Screening | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-maico-ma27-screening-53549 |
| 55 | D | Diagnostic | 32749 | Echipament de Diagnostic Mare Dial | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-mare-dial-32749 |
| 56 | D | Diagnostic | 80551 | Echipament de Diagnostic Mic 6-11 Cm Child Mic | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-mic-6-11-cm-child-mic-80551 |
| 57 | D | Diagnostic | 80552 | Echipament de Diagnostic Mic/medium1 0-19 Cm Child | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-mic-medium1-0-19-cm-child-80552 |
| 58 | D | Diagnostic | 32881 | Echipament de Diagnostic Microlife Afib Advanced | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-microlife-afib-advanced-32881 |
| 59 | D | Diagnostic | 32868 | Echipament de Diagnostic Microlife Watchbp Home A | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-microlife-watchbp-home-a-32868 |
| 60 | D | Diagnostic | 35196 | Echipament de Diagnostic Otoscop cu Camera - Android + Ios | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-otoscop-cu-camera-android-ios-35196 |
| 61 | D | Diagnostic | 32156 | Echipament de Diagnostic Otoscop Lens | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-otoscop-lens-32156 |
| 62 | D | Diagnostic | 33533 | Echipament de Diagnostic Platinum Version Actualizare Optionala pentru Mir. | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-platinum-version-can-be-unlocked-by-a-paid-upgrade-to-mir-33533 |
| 63 | D | Diagnostic | 49950 | Echipament de Diagnostic Ri-champion® Smart Pro+ Blood Pressure | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-ri-champion-smart-pro-blood-pressure-49950 |
| 64 | D | Diagnostic | 49951 | Echipament de Diagnostic Ri-champion® Smart Pro+ Blood Pressure | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-ri-champion-smart-pro-blood-pressure-49951 |
| 65 | D | Diagnostic | 32748 | Echipament de Diagnostic Riester Big Ben - Rail | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-riester-big-ben-rail-32748 |
| 66 | D | Diagnostic | 32742 | Echipament de Diagnostic Riester Big Ben® - Rail | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-riester-big-ben-rail-32742 |
| 67 | D | Diagnostic | 32839 | Echipament de Diagnostic See Page 305 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-see-page-305-32839 |
| 68 | D | Diagnostic | 32841 | Echipament de Diagnostic See Page 305 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-see-page-305-32841 |
| 69 | D | Diagnostic | 32847 | Echipament de Diagnostic See Page 305 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-see-page-305-32847 |
| 70 | D | Diagnostic | 32849 | Echipament de Diagnostic See Page 305 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-see-page-305-32849 |
| 71 | D | Diagnostic | 33623 | Echipament de Diagnostic Sibelsound 400-a Screening Audiometer cu | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-sibelsound-400-a-screening-audiometer-cu-33623 |
| 72 | D | Diagnostic | 33626 | Echipament de Diagnostic Sibelsound 400-supra Clinical Audiometer - Air + | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-sibelsound-400-supra-clinical-audiometer-air-33626 |
| 73 | D | Diagnostic | 32865 | Echipament de Diagnostic Tub Spiralat | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-tub-spiralat-32865 |
| 74 | D | Diagnostic | 32180 | Echipament de Diagnostic Wi-fi & USB Videotoscope cu Software | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-diagnostic-wi-fi-usb-videotoscope-cu-software-32180 |
| 75 | D | Monitorizare | 33328 | Echipament de Monitorizare 10 Leads Cablu ECG - Rezerva | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-10-leads-cablu-ecg-rezerva-33328 |
| 76 | D | Monitorizare | 35137 | Echipament de Monitorizare 5 Leads ECG Cablu 3.75 M - Piesa de Schimb | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-5-leads-ecg-cablu-3-75-m-piesa-de-schimb-35137 |
| 77 | D | Monitorizare | 28107 | Echipament de Monitorizare Allergic Rhinitis Reliever | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-allergic-rhinitis-reliever-28107 |
| 78 | D | Monitorizare | 33879 | Echipament de Monitorizare Cardiac | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-cardiac-33879 |
| 79 | D | Monitorizare | 33232 | Echipament de Monitorizare Cardiopocket ECG 3 Channels - cu Software | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-cardiopocket-ecg-3-channels-cu-software-33232 |
| 80 | D | Monitorizare | 33858 | Echipament de Monitorizare Chison Qbit5 Ecocolourdoppler | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-chison-qbit5-ecocolourdoppler-33858 |
| 81 | D | Monitorizare | 33953 | Echipament de Monitorizare Convex 3.5 2-6.8 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-convex-3-5-2-6-8-33953 |
| 82 | D | Monitorizare | 33247 | Echipament de Monitorizare D-heart 8-12 Channel ECG | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-d-heart-8-12-channel-ecg-33247 |
| 83 | D | Monitorizare | 33306 | Echipament de Monitorizare ECG Cablu - Piesa de Schimb | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-ecg-cablu-piesa-de-schimb-33306 |
| 84 | D | Monitorizare | 33317 | Echipament de Monitorizare ECG Cablu - Piesa de Schimb | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-ecg-cablu-piesa-de-schimb-33317 |
| 85 | D | Monitorizare | 35130 | Echipament de Monitorizare ECG Holter + Software | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-ecg-holter-software-35130 |
| 86 | D | Monitorizare | 33336 | Echipament de Monitorizare ECG-viewer Software (gb, Fr, It, De, Pl, Ru, Es, Tu) pentru | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-ecg-viewer-software-gb-fr-it-de-pl-ru-es-tu-pentru-33336 |
| 87 | D | Monitorizare | 35141 | Echipament de Monitorizare Hartie 5.1 Cm X 12 M - Cutie cu 5 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-hartie-5-1-cm-x-12-m-cutie-cu-5-35141 |
| 88 | D | Monitorizare | 35138 | Echipament de Monitorizare Li-ion Baterie - Piesa de Schimb | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-li-ion-baterie-piesa-de-schimb-35138 |
| 89 | D | Monitorizare | 33878 | Echipament de Monitorizare Linear 7.5 4-15 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-linear-7-5-4-15-33878 |
| 90 | D | Monitorizare | 35129 | Echipament de Monitorizare Litiu Re-chargeable Baterie - Rezerva pentru , | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-litiu-re-chargeable-baterie-rezerva-pentru-35129 |
| 91 | D | Monitorizare | 33964 | Echipament de Monitorizare Micro Convex | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-micro-convex-33964 |
| 92 | D | Monitorizare | 33956 | Echipament de Monitorizare Micro-convex | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-micro-convex-33956 |
| 93 | D | Monitorizare | 33301 | Echipament de Monitorizare Mindray Beneheart R3 Electrocardiograph 3 Channels | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-mindray-beneheart-r3-electrocardiograph-3-channels-33301 |
| 94 | D | Monitorizare | 33992 | Echipament de Monitorizare Mindray Dp-50 Expert Portabil Ecograf cu | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-mindray-dp-50-expert-portabil-ecograf-cu-33992 |
| 95 | D | Monitorizare | 28065 | Echipament de Monitorizare Nebulizator Portabil cu Tehnologie Mesh | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-nebulizator-portabil-cu-tehnologie-mesh-28065 |
| 96 | D | Monitorizare | 49893 | Echipament de Monitorizare Omron Gs Cuff2 M 22-32 Cm - Piesa de Schimb | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-omron-gs-cuff2-m-22-32-cm-piesa-de-schimb-49893 |
| 97 | D | Monitorizare | 33958 | Echipament de Monitorizare Pediatric 5.0 4-10.7 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-pediatric-5-0-4-10-7-33958 |
| 98 | D | Monitorizare | 35136 | Echipament de Monitorizare Pediatric Spo2 Sonda | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-pediatric-spo2-sonda-35136 |
| 99 | D | Monitorizare | 33877 | Echipament de Monitorizare Qbit5 Ecocolourdoppler - 15" Flat High Resolution | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-qbit5-ecocolourdoppler-15-flat-high-resolution-33877 |
| 100 | D | Monitorizare | 33014 | Echipament de Monitorizare Roll Termic Hartie - 80 Mm X 20 M - Cutie cu 10 | starts generic, category-driven title, awkward Romanian | http://localhost:3000/produse/echipament-de-monitorizare-roll-termic-hartie-80-mm-x-20-m-cutie-cu-10-33014 |

## Worst 100 Slugs

| # | Grade | Category | Code | Slug | Title | Issues |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | D | Diagnostic | 32809 | echipament-de-diagnostic-adult-cuff-spare-32809 | Echipament de Diagnostic Adult Manseta - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 2 | D | Monitorizare | 35124 | echipament-de-monitorizare-35135-reusable-adult-spo2-sonda-rezerva-35124 | Echipament de Monitorizare 35135 Reusable Adult Spo2 Sonda - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 3 | D | Monitorizare | 35132 | echipament-de-monitorizare-35135-reusable-adult-spo2-sonda-rezerva-35132 | Echipament de Monitorizare 35135 Reusable Adult Spo2 Sonda - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 4 | D | Monitorizare | 35135 | echipament-de-monitorizare-adult-spo2-sonda-rezerva-35135 | Echipament de Monitorizare Adult Spo2 Sonda - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 5 | D | Monitorizare | 35139 | echipament-de-monitorizare-nibp-manseta-21-35-cm-adult-rezerva-35139 | Echipament de Monitorizare Nibp Manseta 21-35 Cm - Adult - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 6 | D | Urgenta | 35105 | echipament-de-urgenta-adult-probe-40-kg-reusable-spare-35105 | Echipament de Urgenta Adult Sonda >40 Kg - Reusable - Rezerva | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 7 | D | Ingrijire pacient | 28502 | produs-pentru-ingrijire-pacient-pvc-water-mattress-28502 | Produs pentru Ingrijire Pacient PVC Water Mattress | starts generic, category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 8 | D | Diagnostic | 33621 | echipament-de-diagnostic-insulation-device-pentru-air-conduction-phone-33621 | Echipament de Diagnostic Adaptor de Izolare pentru Casti pentru Conductie Aeriana* | starts generic, category-driven title, awkward Romanian, repeated words, slug contains English |
| 9 | D | Mobilier medical | 27520 | mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27520 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 10 | D | Mobilier medical | 27521 | mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27521 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 11 | D | Mobilier medical | 27522 | mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27522 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 12 | D | Mobilier medical | 27524 | mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27524 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 13 | D | Mobilier medical | 27525 | mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27525 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 14 | D | Mobilier medical | 27526 | mobilier-medical-stool-cu-ring-27531-27532-27533-27534-27535-27536-27530-27526 | Mobilier Medical Stool cu Ring 27531 27532 27533 27534 27535 27536 27530 ** | category-driven title, untranslated fragment, awkward Romanian, slug contains English |
| 15 | D | Diagnostic | 35193 | echipament-de-diagnostic-cuff-22-35-cm-piesa-de-schimb-35193 | Echipament de Diagnostic Manseta 22-35 Cm - Piesa de Schimb | starts generic, category-driven title, awkward Romanian, slug contains English |
| 16 | D | Diagnostic | 32900 | echipament-de-diagnostic-mare-superb-cuff-2-tubes-34-43-cm-32900 | Echipament de Diagnostic Mare "superb" Manseta 2 Tubes - 34-43 Cm* | starts generic, category-driven title, awkward Romanian, slug contains English |
| 17 | D | Monitorizare | 33316 | echipament-de-monitorizare-contec-8000-wireless-ecg-workstation-33316 | Echipament de Monitorizare Contec 8000 fara Fir ECG Workstation | starts generic, category-driven title, awkward Romanian, slug contains English |
| 18 | D | Monitorizare | 33990 | echipament-de-monitorizare-probes-dp-50-dp-50-expert-33990 | Echipament de Monitorizare Sonde Dp-50, Dp-50 Expert, | starts generic, category-driven title, awkward Romanian, slug contains English |
| 19 | D | Urgenta | 23525 | echipament-de-urgenta-ihealth-air-wireless-23525 | Echipament de Urgenta Ihealth Air - fara Fir | starts generic, category-driven title, awkward Romanian, slug contains English |
| 20 | D | Urgenta | 35095 | echipament-de-urgenta-oxy-10-multifunctional-oximeter-wireless-35095 | Echipament de Urgenta Oxy-10 Multifunctional Oximeter - fara Fir | starts generic, category-driven title, awkward Romanian, slug contains English |
| 21 | D | Ingrijire pacient | 43191 | produs-pentru-ingrijire-pacient-comfort-commode-43191 | Produs pentru Ingrijire Pacient Comfort Scaun cu Functie Toaleta | starts generic, category-driven title, awkward Romanian, slug contains English |
| 22 | D | Ingrijire pacient | 43193 | produs-pentru-ingrijire-pacient-commode-si-shower-43193 | Produs pentru Ingrijire Pacient Scaun cu Functie Toaleta si Shower | starts generic, category-driven title, awkward Romanian, slug contains English |
| 23 | D | Mobilier medical | 27676 | mobilier-medical-27673-specialistic-bed-cu-trendelenburg-40-80-cm-27676 | Mobilier Medical 27673 Specialistic Bed cu Trendelenburg - 40-80 Cm | category-driven title, untranslated fragment, slug contains English |
| 24 | D | Mobilier medical | 27677 | mobilier-medical-27673-specialistic-bed-cu-trendelenburg-40-80-cm-27677 | Mobilier Medical 27673 Specialistic Bed cu Trendelenburg - 40-80 Cm | category-driven title, untranslated fragment, slug contains English |
| 25 | D | Mobilier medical | 27872 | mobilier-medical-build-up-your-cart-27872 | Mobilier Medical Build Up Your Cart | category-driven title, untranslated fragment, slug contains English |
| 26 | D | Mobilier medical | 27901 | mobilier-medical-cabinet-1-door-27901 | Mobilier Medical Cabinet - 1 Door | category-driven title, untranslated fragment, slug contains English |
| 27 | D | Mobilier medical | 27905 | mobilier-medical-cabinet-2-doors-27905 | Mobilier Medical Cabinet - 2 Doors | category-driven title, untranslated fragment, slug contains English |
| 28 | D | Mobilier medical | 27903 | mobilier-medical-cabinet-4-doors-27903 | Mobilier Medical Cabinet - 4 Doors | category-driven title, untranslated fragment, slug contains English |
| 29 | D | Mobilier medical | 43460 | mobilier-medical-electric-aluminium-patient-43460 | Mobilier Medical Electric Aluminium Patient | category-driven title, untranslated fragment, slug contains English |
| 30 | D | Mobilier medical | 43455 | mobilier-medical-electric-pliabil-patient-43455 | Mobilier Medical Electric Pliabil Patient | category-driven title, untranslated fragment, slug contains English |
| 31 | D | Mobilier medical | 28030 | mobilier-medical-gamma1-cabinet-61x45xh-77-cm-mic-28030 | Mobilier Medical GAMMA1 Cabinet - 61x45xh 77 Cm - Mic | category-driven title, untranslated fragment, slug contains English |
| 32 | D | Mobilier medical | 28031 | mobilier-medical-gamma3-cabinet-108x45xh-77-cm-mare-28031 | Mobilier Medical GAMMA3 Cabinet - 108x45xh 77 Cm - Mare | category-driven title, untranslated fragment, slug contains English |
| 33 | D | Mobilier medical | 43450 | mobilier-medical-hidraulic-patient-lifter-43450 | Mobilier Medical Hidraulic Patient Lifter | category-driven title, untranslated fragment, slug contains English |
| 34 | D | Mobilier medical | 27874 | mobilier-medical-infusion-suport-fixed-height-27874 | Mobilier Medical Infusion Suport - Fixed Height* | category-driven title, untranslated fragment, slug contains English |
| 35 | D | Mobilier medical | 44048 | mobilier-medical-massage-bed-cu-face-hole-44048 | Mobilier Medical Massage Bed - cu Face Hole | category-driven title, untranslated fragment, slug contains English |
| 36 | D | Mobilier medical | 27885 | mobilier-medical-pro-cart-2-shelves-h-80-cm-27885 | Mobilier Medical Pro Cart 2 Shelves - H 80 Cm | category-driven title, untranslated fragment, slug contains English |
| 37 | D | Mobilier medical | 29545 | mobilier-medical-reusable-foetal-transducer-belts-6x150-cm-grey-29545 | Mobilier Medical Reusable Foetal Transducer Belts 6x150 Cm - Grey | category-driven title, untranslated fragment, slug contains English |
| 38 | D | Mobilier medical | 27838 | mobilier-medical-shower-extension-hose-6-m-27838 | Mobilier Medical Shower Extension Hose - 6 M | category-driven title, untranslated fragment, slug contains English |
| 39 | D | Mobilier medical | 27836 | mobilier-medical-shower-mattress-27836 | Mobilier Medical Shower Mattress | category-driven title, untranslated fragment, slug contains English |
| 40 | D | Mobilier medical | 27523 | mobilier-medical-standard-accessories-27523 | Mobilier Medical Standard Accessories | category-driven title, untranslated fragment, slug contains English |
| 41 | D | Mobilier medical | 45231 | mobilier-medical-stool-alb-45231 | Mobilier Medical Stool- Alb | category-driven title, untranslated fragment, slug contains English |
| 42 | D | Mobilier medical | 45241 | mobilier-medical-stool-alb-45241 | Mobilier Medical Stool- Alb | category-driven title, untranslated fragment, slug contains English |
| 43 | D | Mobilier medical | 45232 | mobilier-medical-stool-albastru-45232 | Mobilier Medical Stool- Albastru | category-driven title, untranslated fragment, slug contains English |
| 44 | D | Mobilier medical | 45242 | mobilier-medical-stool-albastru-45242 | Mobilier Medical Stool- Albastru | category-driven title, untranslated fragment, slug contains English |
| 45 | D | Mobilier medical | 45235 | mobilier-medical-stool-avio-albastru-45235 | Mobilier Medical Stool - Avio Albastru | category-driven title, untranslated fragment, slug contains English |
| 46 | D | Mobilier medical | 45245 | mobilier-medical-stool-cu-backrest-avio-albastru-45245 | Mobilier Medical Stool cu Backrest - Avio Albastru | category-driven title, untranslated fragment, slug contains English |
| 47 | D | Mobilier medical | 27532 | mobilier-medical-stool-cu-or-fara-ring-27532 | Mobilier Medical Stool - cu Or fara Ring | category-driven title, untranslated fragment, slug contains English |
| 48 | D | Mobilier medical | 27530 | mobilier-medical-stool-fara-ring-27527-27528-27530 | Mobilier Medical Stool fara Ring 27527 27528 ** | category-driven title, untranslated fragment, slug contains English |
| 49 | D | Mobilier medical | 27531 | mobilier-medical-stool-fara-ring-27527-27528-27531 | Mobilier Medical Stool fara Ring 27527 27528 ** | category-driven title, untranslated fragment, slug contains English |
| 50 | D | Mobilier medical | 27533 | mobilier-medical-stool-fara-ring-27527-27528-27533 | Mobilier Medical Stool fara Ring 27527 27528 ** | category-driven title, untranslated fragment, slug contains English |
| 51 | D | Mobilier medical | 27534 | mobilier-medical-stool-fara-ring-27527-27528-27534 | Mobilier Medical Stool fara Ring 27527 27528 ** | category-driven title, untranslated fragment, slug contains English |
| 52 | D | Mobilier medical | 27535 | mobilier-medical-stool-fara-ring-27527-27528-27535 | Mobilier Medical Stool fara Ring 27527 27528 ** | category-driven title, untranslated fragment, slug contains English |
| 53 | D | Mobilier medical | 27536 | mobilier-medical-stool-fara-ring-27527-27528-27536 | Mobilier Medical Stool fara Ring 27527 27528 ** | category-driven title, untranslated fragment, slug contains English |
| 54 | D | Mobilier medical | 27898 | mobilier-medical-value-cabinet-1-door-27898 | Mobilier Medical Value Cabinet - 1 Door | category-driven title, untranslated fragment, slug contains English |
| 55 | D | Mobilier medical | 27899 | mobilier-medical-value-cabinet-2-doors-27899 | Mobilier Medical Value Cabinet - 2 Doors | category-driven title, untranslated fragment, slug contains English |
| 56 | D | Mobilier medical | 27902 | mobilier-medical-value-cabinet-4-doors-2-hinged-2-sliding-27902 | Mobilier Medical Value Cabinet - 4 Doors (2 Hinged, 2 Sliding) | category-driven title, untranslated fragment, slug contains English |
| 57 | D | Mobilier medical | 27900 | mobilier-medical-value-cabinet-4-doors-hinged-27900 | Mobilier Medical Value Cabinet - 4 Doors (hinged) | category-driven title, untranslated fragment, slug contains English |
| 58 | D | Mobilier medical | 27912 | mobilier-medical-wall-cabinet-painted-door-27912 | Mobilier Medical Wall Cabinet - Vopsit Door | category-driven title, untranslated fragment, slug contains English |
| 59 | D | Mobilier medical | 27911 | mobilier-medical-wall-cabinet-sticla-sliding-door-27911 | Mobilier Medical Wall Cabinet - Sticla Sliding Door | category-driven title, untranslated fragment, slug contains English |
| 60 | D | Mobilier medical | 27837 | mobilier-medical-water-tank-10-l-27837 | Mobilier Medical Water Tank - 10 L | category-driven title, untranslated fragment, slug contains English |
| 61 | D | Mobilier medical | 45236 | stool-lampa-beige-45246-stool-cu-backrest-45236 | Stool - Lampa Beige 45246 Stool cu Backrest | untranslated fragment, repeated words, slug contains English |
| 62 | D | Cantare si masurare | 27281 | echipament-de-cantarire-si-masurare-power-supplier-spare-27281 | Echipament de Cantarire si Masurare Power Supplier - Rezerva | starts generic, awkward Romanian, slug contains English |
| 63 | D | Ingrijire pacient | 43196 | albastru-commode-scaun-rulant-43196 | Albastru Scaun cu Functie Toaleta Scaun Rulant | awkward Romanian, repeated words, slug contains English |
| 64 | D | Ingrijire pacient | 27703 | commode-scaun-rulant-27703 | Scaun cu Functie Toaleta Scaun Rulant | awkward Romanian, repeated words, slug contains English |
| 65 | D | Ingrijire pacient | 43198 | smart-commode-scaun-rulant-43198 | Smart Scaun cu Functie Toaleta Scaun Rulant | awkward Romanian, repeated words, slug contains English |
| 66 | D | Instrumentar chirurgical | 33183 | instrumentar-chirurgical-chirurgical-skin-marker-double-tip-steril-cutie-cu-100-33183 | Instrumentar Chirurgical Chirurgical Marker pentru Piele - Double Tip - Steril - Cutie cu 100 | category-driven title, repeated words, slug contains English |
| 67 | D | Instrumentar chirurgical | 33182 | instrumentar-chirurgical-chirurgical-skin-marker-single-tip-steril-cutie-cu-100-33182 | Instrumentar Chirurgical Chirurgical Marker pentru Piele - Single Tip - Steril - Cutie cu 100 | category-driven title, repeated words, slug contains English |
| 68 | C | Mobilier medical | 44024 | 2-section-aluminium-massage-masa-alb-44024 | 2-SECTION Aluminium Massage Masa - Alb | untranslated fragment, slug contains English |
| 69 | C | Mobilier medical | 44021 | 2-section-aluminium-massage-masa-albastru-44021 | 2-SECTION Aluminium Massage Masa - Albastru | untranslated fragment, slug contains English |
| 70 | C | Mobilier medical | 44020 | 2-section-aluminium-massage-masa-negru-44020 | 2-SECTION Aluminium Massage Masa - Negru | untranslated fragment, slug contains English |
| 71 | C | Mobilier medical | 44001 | 2-section-wooden-massage-masa-albastru-44001 | 2-section Wooden Massage Masa - Albastru | untranslated fragment, slug contains English |
| 72 | C | Mobilier medical | 44003 | 2-section-wooden-massage-masa-cream-44003 | 2-section Wooden Massage Masa - Cream | untranslated fragment, slug contains English |
| 73 | C | Mobilier medical | 44000 | 2-section-wooden-massage-masa-negru-44000 | 2-section Wooden Massage Masa - Negru | untranslated fragment, slug contains English |
| 74 | C | Mobilier medical | 44002 | 2-section-wooden-massage-masa-turquoise-44002 | 2-section Wooden Massage Masa - Turquoise | untranslated fragment, slug contains English |
| 75 | C | Mobilier medical | 44011 | 3-section-wooden-massage-masa-albastru-44011 | 3-section Wooden Massage Masa - Albastru | untranslated fragment, slug contains English |
| 76 | C | Mobilier medical | 44013 | 3-section-wooden-massage-masa-cream-44013 | 3-section Wooden Massage Masa - Cream | untranslated fragment, slug contains English |
| 77 | C | Urgenta | 35067 | o2ring-continuous-monitoring-oximeter-adult-35067 | O2ring™ Continuous Monitoring Oximeter - Adult | untranslated fragment, slug contains English |
| 78 | C | Laborator / IVD | 34166 | oxygen-masca-cu-tub-adult-34166 | Oxygen Masca cu Tub - Adult | untranslated fragment, slug contains English |
| 79 | C | Mobilier medical | 44050 | pliabil-massage-scaun-44050 | Pliabil Massage Scaun | untranslated fragment, slug contains English |
| 80 | C | Ingrijire pacient | 27701 | commode-scaun-chromed-steel-27701 | Scaun cu Functie Toaleta din Otel Cromat | awkward Romanian, slug contains English |
| 81 | C | Ingrijire pacient | 27702 | commode-scaun-rulant-painted-27702 | Scaun Rulant cu Functie Toaleta - Vopsit | awkward Romanian, slug contains English |
| 82 | C | Mobilier medical | 27373 | lampa-cutie-122x38-cm-43-127-12-14-3-panels-27373 | Lampa Cutie 122x38 Cm 43 127 12 14 3 Panouri | awkward Romanian, slug contains English |
| 83 | C | Mobilier medical | 27367 | lampa-cutie-38x122-cm-127-43-12-14-3-panels-27367 | Lampa Cutie 38x122 Cm 127 43 12 14 3 Panouri | awkward Romanian, slug contains English |
| 84 | C | Mobilier medical | 27368 | lampa-cutie-38x153-cm-158-43-12-18-4-panels-27368 | Lampa Cutie 38x153 Cm 158 43 12 18 4 Panouri | awkward Romanian, slug contains English |
| 85 | C | Mobilier medical | 27366 | lampa-cutie-38x92-cm-97-43-12-11-2-panels-27366 | Lampa Cutie 38x92 Cm 97 43 12 11 2 Panouri | awkward Romanian, slug contains English |
| 86 | C | Mobilier medical | 27369 | lampa-cutie-76x122-cm-127-2x43-12-28-2x3-panels-27369 | Lampa Cutie 76x122 Cm 127 2x43 12 28 2x3 Panouri | awkward Romanian, slug contains English |
| 87 | C | Mobilier medical | 27370 | lampa-cutie-76x153-cm-158-2x43-12-36-2x4-panels-27370 | Lampa Cutie 76x153 Cm 158 2x43 12 36 2x4 Panouri | awkward Romanian, slug contains English |
| 88 | C | Mobilier medical | 27372 | lampa-cutie-92x38-cm-43-97-12-11-2-panels-27372 | Lampa Cutie 92x38 Cm 43 97 12 11 2 Panouri | awkward Romanian, slug contains English |
| 89 | C | Diagnostic | 32918 | smart-automatic-incheietura-tensiometru-32918 | Smart Automat Incheietura Tensiometru | awkward Romanian, slug contains English |
| 90 | C | Instrumentar chirurgical | 33181 | instrumentar-chirurgical-p3-skin-marker-fine-tip-steril-cutie-cu-10-33181 | Instrumentar Chirurgical P3 Marker pentru Piele® - Varf Fin - Steril - Cutie cu 10 | category-driven title, slug contains English |
| 91 | C | Instrumentar chirurgical | 33179 | instrumentar-chirurgical-skin-marker-dual-tips-gentian-violet-cutie-cu-10-33179 | Instrumentar Chirurgical Marker pentru Piele - Doua Varfuri Violet de Gentiana - Cutie cu 10 | category-driven title, slug contains English |
| 92 | C | Mobilier medical | 27365 | lampa-cutie-38x62-cm-67-43-12-8-1-5-panel-27365 | Mobilier Medical Caseta Luminoasa 38 X 62 Cm | category-driven title, slug contains English |
| 93 | C | Mobilier medical | 27364 | mobilier-medical-luminous-optotypes-have-been-designed-27364 | Mobilier Medical Panou Luminos pentru Optotipuri | category-driven title, slug contains English |
| 94 | C | Mobilier medical | 27380 | mobilier-medical-viewing-area-24-x-62-cm-24-x-61-cm-27380 | Mobilier Medical Zona Vizibila: 24 X 62 Cm 24 X 61 Cm | category-driven title, slug contains English |
| 95 | B | Urgenta | 34055 | automatic-loading-targa-34055 | Targa cu Incarcare Automata | slug contains English |
| 96 | B | Urgenta | 34072 | full-automatic-multiposition-targa-34072 | Full Automat Multiposition Targa | slug contains English |
| 97 | B | Cantare si masurare | 27094 | gimafit-body-cantar-cu-app-si-bluetooth-5-0-27094 | Cantar Gimafit pentru Analiza Corporala cu App si Bluetooth 5.0 | slug contains English |
| 98 | B | Cantare si masurare | 27086 | gimafit-body-cantar-cu-bluetooth-5-0-27086 | Cantar Gimafit pentru Analiza Corporala cu Bluetooth 5.0 | slug contains English |
| 99 | B | Urgenta | 35068 | o2ring-wireless-remote-continuous-monitoring-35068 | O2ring™ fara Fir Remote Continuous Monitoring | slug contains English |
| 100 | B | Cantare si masurare | 27293 | omron-bf511-body-composition-monitor-27293 | Omron Bf511 Corp Composition Monitor | slug contains English |

## Repair Recommendations

- Replace generic prefixes such as ?Produs??, ?Echipament?? and ?Mobilier Medical?? with the actual product type whenever source data allows it.
- Repair category-driven titles before visual review: the worst offenders are medical furniture, diagnostic, monitoring and patient-care accessories.
- Remove untranslated fragments from titles and slugs, especially accessory/table terms such as ?spare?, ?panel?, ?bed?, ?cart?, ?stool?, ?patient?, ?cuff?, ?probe?, ?wireless?.
- Do not index this batch until A count is materially higher and C/D are zero.
- Keep product routes noindex and excluded from sitemap during this repair cycle.

## Audit Method

- Audited the 500 products currently marked `publicDisplayReady`, `strictQualityStatus=pass`, `catalogStatus=ready_for_publish`.
- Scored title and slug quality only; this audit does not modify product content.
- Allowed brand/model names and standard technical terms such as ECG, LED, USB, CE, ISO, Bluetooth, WiFi, DICOM, PACS and RIS.
