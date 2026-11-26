# The World Today — 25 November 2026

[![Bounty](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125)
[![Rank](https://make.fun/badge/news-image-20261125/mhmmdnofal353-blip/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125)
[![Reward](https://make.fun/badge/news-image-20261125/mhmmdnofal353-blip/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125)

One image summing up the world news of Wednesday 25 November 2026, as a
newspaper front page. Entry for the make.fun competition
[news-image-20261125](https://make.fun/bounty/news-image-20261125).

## The day's stories

- **Lead — Gulf energy:** Iran's Revolutionary Guards say two oil
  tankers struck naval mines, exploded and caught fire in the Strait of
  Hormuz after using routes Tehran had not authorised. Yemen's
  Iran-aligned Houthis say they attacked Saudi Arabia's Ras Tanura
  refinery, the kingdom's largest; satellite imagery showed thick black
  smoke over the installation, while the Saudi-led coalition said its
  air defences destroyed four drones over Ras Tanura.
- **Pacific — security pact:** The Solomon Islands signs a treaty with
  Australia making Canberra its "primary security partner" and declares
  there will be no foreign military or security base on its soil,
  checking China's ambitions in the South Pacific four years after
  Honiara's secretive defence deal with Beijing.
- **Space — Tiangong:** China's Shenzhou-24 docks with the Tiangong
  space station carrying Muhammad Zeeshan Ali, Pakistan's first
  astronaut to reach orbit and the first foreigner to visit Tiangong.
- **Trade — tariffs:** The United States proposes new tariffs on 14
  trading partners over structural excess factory capacity, with China
  facing 20%; AI stocks slide, Nvidia falling 3.9%, as hot US inflation
  data rattles markets.
- **Also today:** Ukrainian strikes push Russian oil refining to a
  20-year low; a Sudanese rights group says RSF drone strikes killed 19
  civilians in Blue Nile state; Bangladesh raises garment workers'
  minimum wage 36% after protests; Pope Leo XIV laments the COP31
  climate talks' failure; Poland plans a restricted no-fly zone along
  its eastern border.

## How it was made

The front page was composed programmatically (Python + Pillow): every
shape and letter is drawn from fixed coordinates, so the output is
deterministic. It is saved as a 1024×1024 JPEG (`entry.png`, under the
1 MiB limit). The program in this repository, `main.ts`, copies that
image to the output directory after verifying its magic bytes and size,
then re-reads the copy to confirm it is byte-identical.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Requires Node 22. No network, no dependencies.

## Licence

MIT — see [LICENSE](LICENSE).
