import { OptionsService } from "@/services/options.service";

export default async function AchievementBar() {
    const global =
        await OptionsService.getGlobalOptions();

    return (
        <section className="about-achievement">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap achievement-row">

                {global.achievement.map((item, index) => (
                    <div
                        key={index}
                        className="w-1/2 lg:w-3/12 achievement-column"
                    >
                        <div
                            className="achievement-box reveal fade-up"
                            style={{
                                "--delay": `${index * 90}ms`,
                            } as React.CSSProperties}
                        >
                            <img
                                src={item.image.url}
                                alt={item.image.alt || ""}
                            />

                            <p
                                dangerouslySetInnerHTML={{
                                    __html: item.text,
                                }}
                            />
                        </div>
                    </div>
                ))}

            </div>
        </div>
    </section>
    );
}