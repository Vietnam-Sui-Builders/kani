// import {hasLocale} from "next-intl"
// import {routing} from "./routing"
import { getRequestConfig } from "next-intl/server"
 
export default getRequestConfig(async (
// {
//    requestLocale
// }
) => {
    // Typically corresponds to the `[locale]` segment
    // const requested = await requestLocale
    // const locale = hasLocale(routing.locales, requested)
    //     ? requested
    //     : routing.defaultLocale
    const locale = "en"
    return {
        locale,
        messages: (await import(`../../lang/${locale}.json`)).default
    }
})