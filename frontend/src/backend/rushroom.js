import { supabase } from "./supabaseClient";


const fetchRushroom = async () => {
    const { data, error } = await supabase
        .from("toilets")
        .select();

    if (error) {
        console.error("Supabase Fetch Error:", error);
        return [];
    }

    // Filter out entries without valid coordinates
    const validToilets = data.filter(toilet => 
        toilet.latitude && toilet.longitude
    );

    console.log("Valid Toilets:", validToilets);
    return validToilets;
};

export default fetchRushroom;