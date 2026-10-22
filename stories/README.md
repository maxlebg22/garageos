# Stories — dessins animés générés

Production d'épisodes pour enfants dans un univers 100 % original, **La Famille Plouf**.

- `bible.md` : univers, direction artistique, palette, fiches des personnages et des lieux, règles d'écriture.
- `episodes/` : un fichier par épisode, découpé en plans (prompt image, prompt mouvement, dialogue).

## Étapes de production

1. **Planches de référence** : une par personnage (face, profil, dos, 3 expressions), générée à partir du bloc style et de la fiche. On les valide à la main avant d'aller plus loin.
2. **Images des plans** : bloc style + fiches + description du plan, avec les planches de référence en image d'entrée.
3. **Animation** : chaque image est animée avec son prompt de mouvement (MiniMax Hailuo, Kling ou équivalent, en image-to-video).
4. **Voix** : une voix ElevenLabs par personnage, réplique par réplique.
5. **Montage** : on assemble les plans, les voix, les bruitages et la musique (DaVinci Resolve ou ffmpeg).

Pour automatiser tout ça, il faut des clés API pour : la génération d'images, la génération vidéo et ElevenLabs.
