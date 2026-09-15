import { OptionsService } from "@/services/options.service";

export default async function UspBar() {
    const global =
        await OptionsService.getGlobalOptions();

    return (
        <section className="hm-usp-bar">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap usp-row">

                    {global.usp.map((usp, index) => (
                        <div
                            key={index}
                            className="w-1/2 lg:w-3/12 usp-column"
                        >
                            <div
                                className="hm-usp-box reveal fade-up"
                                style={
                                    {
                                        "--delay": `${index * 100}ms`,
                                    } as React.CSSProperties
                                }
                            >
                                <div className="usp-icon">
                                    <i
                                        className={`fa-regular fa-${usp.icon}`}
                                    ></i>
                                </div>

                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: usp.text,
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