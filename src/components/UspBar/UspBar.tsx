import { OptionsService } from "@/services/options.service";

export default async function UspBar() {
    const global =
    await OptionsService.getGlobalOptions();
  return (

    <section className="hm-usp-bar">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">
                {global.usp.map(
                (usp, index) => (
                <div key={index}  className="w-full lg:w-3/12 px-0.5">
                    <div className="hm-usp-box">
                        <i className={`fa-regular fa-${usp.icon}`}></i>
                        <p dangerouslySetInnerHTML={{
                                __html:
                                usp.text,
                            }} />
                    </div>
                </div>
                )
                )}
                
            </div>
        </div>
    </section>
    );
}