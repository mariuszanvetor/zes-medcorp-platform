# Product Gold Replication Report

Generated: 2026-06-07T10:39:32.711Z

Scope: Existing local product catalog only. No imports, no deployment, no indexation.

## Summary

- Products attempted: 716
- Products upgraded/public-display-ready locally: 500
- Products rejected during gate: 3
- A grade products: 55
- B grade products: 445
- C grade products shown publicly: 0
- D grade products shown publicly: 0
- Indexable products: 0

## Quality Rules Extracted From The 20 Gold Products

- Natural Romanian product title with product type translated and model/code preserved.
- Romanian SEO slug ending with product code.
- Commercial description that mentions the product, category, use case and offer context.
- Applications, benefits, service/maintenance notes and related services.
- Grouped Romanian specifications: General, Dimensiuni, Greutate, Electric, Performanta, Medical, Accesorii.
- At least one verified local image and no broken local documents.
- No source/import/review metadata, no external source links, no fake price or stock.
- All products remain noindex until a separate approval/indexation phase.

## Category Coverage

| Category | Products |
| --- | ---: |
| medical-furniture | 138 |
| scales-measures | 66 |
| diagnostic | 60 |
| emergency | 52 |
| monitoring | 48 |
| patient-care | 41 |
| sterilization | 27 |
| laboratory | 22 |
| electromedical | 12 |
| medical-lights | 12 |
| ent | 10 |
| gynecology | 8 |
| surgical-instruments | 4 |

## Specification Recovery

- Average specification count: 4.7
- Products with local documents: 16
- Products with multiple images: 16

## Sample URLs

1. Masă peste pat Elite (A, 15 specs)  
   http://localhost:3000/produse/masa-peste-pat-elite-27487
2. Scaun cu rotile pliabil cu funcție toaletă (A, 13 specs)  
   http://localhost:3000/produse/scaun-cu-rotile-pliabil-cu-functie-toaleta-43202
3. Cantar Multifunctional (A, 7 specs)  
   http://localhost:3000/produse/multifunctional-cantar-27243
4. Echipament de Cantarire si Masurare Rampa de Acces (A, 7 specs)  
   http://localhost:3000/produse/echipament-de-cantarire-si-masurare-rampa-de-acces-27244
5. Echipament de Diagnostic Adult Manseta - Rezerva (A, 6 specs)  
   http://localhost:3000/produse/echipament-de-diagnostic-adult-cuff-spare-32809
6. Tensiometru de Brat Ihealth Neo BP5S - cu Ecran (B, 5 specs)  
   http://localhost:3000/produse/ihealth-neo-bp5s-tensiometru-de-brat-cu-ecran-23495
7. Cărucior de urgență Neo Plus (A, 17 specs)  
   http://localhost:3000/produse/carucior-de-urgenta-neo-plus-45720
8. Targă pliabilă pentru scări (A, 15 specs)  
   http://localhost:3000/produse/targa-pliabila-pentru-scari-34068
9. Monitor Multiparametric pentru 6 Parametri (A, 19 specs)  
   http://localhost:3000/produse/monitor-multiparametric-pentru-6-parametri-24128
10. ECG portabil PM10 cu software și Bluetooth (A, 11 specs)  
   http://localhost:3000/produse/ecg-portabil-pm10-cu-software-si-bluetooth-33246
11. Produs pentru Ingrijire Pacient Pedalier pentru Exercitii (A, 6 specs)  
   http://localhost:3000/produse/produs-pentru-ingrijire-pacient-pedalier-pentru-exercitii-43153
12. Scaun Rulant Electric - 30 Cm Roti Spate (A, 6 specs)  
   http://localhost:3000/produse/electric-scaun-rulant-30-cm-spate-roti-43290
13. Autoclavă Hydra Evo cu imprimantă, 15 l (A, 17 specs)  
   http://localhost:3000/produse/autoclava-hydra-evo-cu-imprimanta-15-l-35660
14. Autoclavă Prestige 12 l (A, 16 specs)  
   http://localhost:3000/produse/autoclava-prestige-12-l-35712
15. Analizor hemoglobină și hematocrit Hemo Control (A, 16 specs)  
   http://localhost:3000/produse/analizor-hemoglobina-si-hematocrit-hemo-control-23994
16. Câmp Chirurgical Steril Netesut 50 X 50 Cm (A, 11 specs)  
   http://localhost:3000/produse/camp-chirurgical-steril-netesut-50-x-50-cm-23580
17. Echipament Electromedical Electro-depilator 400 (B, 4 specs)  
   http://localhost:3000/produse/echipament-electromedical-electro-depilator-400-28340
18. Echipament Electromedical Aspirator de Fum Chirurgical (B, 4 specs)  
   http://localhost:3000/produse/echipament-electromedical-aspirator-de-fum-chirurgical-30450
19. Baza pentru Carucior Ø 61 Cm - Piesa de Schimb (B, 4 specs)  
   http://localhost:3000/produse/carucior-baza-61-cm-piesa-de-schimb-30769
20. Lampa Medicala LED pentru Carucior (B, 4 specs)  
   http://localhost:3000/produse/lumina-led-lampa-carucior-49035

## Rejected Examples

- 33245: Echipament de Monitorizare ECG Portabil Cardio-c cu 3 Canale [monitoring] - english_leak
- 24046: Analizor de urină cu Bluetooth [laboratory] - english_leak
- 24035: Centrifugă de laborator XC-2000 [laboratory] - english_leak

## Validation Notes

Run required validation after this script:

```bash
npm run build -- --webpack
npm run content:check
npm run audit:seo
```

Ready for visual review only after validation passes. Do not commit, deploy or index in this phase.
