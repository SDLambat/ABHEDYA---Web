# ABHEDYA — The Un-Breachable Shield

Website for **ABHEDYA**, a portable non-contact Raman spectroscopy + edge-AI screening system for narcotics and explosives across Indian Railways (Smart India Hackathon 2026, problem statement SIH26026, Team 133660).

Built with React 19, Vite, Tailwind CSS v4, Framer Motion, and Lucide icons. Deployable to Cloudflare (`wrangler.jsonc` included) or any static host.

Repository: [https://github.com/SDLambat/abhedya](https://github.com/SDLambat/abhedya)

## Run

    npm install
    npm run dev       # http://localhost:5173
    npm run build     # output in dist/
    npm run preview

## Pages

- `#overview` What ABHEDYA is, problem and response, solution, comparison table
- `#optics` Raman principle, optical layout, block diagram, prototype photo
- `#workflow` Detection pipeline and CLEAR / REPEAT / ESCALATE
- `#feasibility` Feasibility, approaches considered, viability
- `#hardware` Components grouped by function (filterable)
- `#impact` Impact on stakeholders and benefits
- `#docs` Slide-by-slide viewer of the SIH submission and PDF download
- `#team` Team details and member cards

## Things to fill in

Edit `src/config/site.js`:

- `LINKS`: Git repo, YouTube video, CAD, report and workflow URLs. Empty ones are hidden automatically.
- `TEAM`: add members (name, role, bio, github, linkedin, mail).

## Replace the submission PDF

Overwrite `public/documents/ABHEDYA_SIH2026_Submission.pdf`. The slide images in `src/assets/slides/` were rendered from it:
`pdftoppm -r 110 -jpeg -f 1 -l 5 your.pdf slide`, then rename to `slide-1.jpg` ... `slide-5.jpg`.

## Notes

- The workflow page was written from the text of the submission (the workflow diagram was blank in the PDF). Adjust `src/pages/WorkflowPage.jsx` if your final flow differs.
- The spectrum on the Optics page is an illustration, not measured data.
- No hardware prices or performance numbers are shown, because none are in the submission.
