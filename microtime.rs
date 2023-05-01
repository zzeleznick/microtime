use deno_bindgen::deno_bindgen;
use std::time::SystemTime;

#[deno_bindgen]
fn now() -> u64 {
    let now = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH);
    let microtime = match now {
        Ok(n) => n.as_micros() as u64,
        Err(_) => 0,
    };
    microtime
}
