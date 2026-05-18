const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  "https://falhnuizxugezpqtinxj.supabase.co",
  "sb_publishable_5M6w8Jg4k3TOHHeRFWXGpQ_9DD2QGtc"
)

module.exports = supabase