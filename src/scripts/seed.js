import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
    USERS,
    PATIENTS,
    MOTHER_VITALS,
    MOTHER_APPOINTMENTS,
    PARTNER_TASKS,
    PARTNER_NUTRITION
} from '../data/mockData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Use service_role key to bypass RLS

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env file.")
    console.error("Please add SUPABASE_SERVICE_ROLE_KEY to your .env file temporarily for this script.")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function seed() {
    console.log("🌱 Starting Database Seed...")

    try {
        // ----------------------------------------------------
        // 1. Create Mother User
        // ----------------------------------------------------
        console.log("Creating Mother User...")
        const motherUser = USERS.mother[0]
        let motherId = null

        // Check if user exists first to allow re-runs
        const { data: existingMotherAuth, error: authCheckErr } = await supabase.auth.admin.listUsers()

        if (existingMotherAuth?.users) {
            const found = existingMotherAuth.users.find(u => u.email === motherUser.email)
            if (found) motherId = found.id
        }

        if (!motherId) {
            const { data: motherAuth, error: motherAuthErr } = await supabase.auth.admin.createUser({
                email: motherUser.email,
                password: motherUser.password,
                email_confirm: true
            })
            if (motherAuthErr) throw motherAuthErr
            motherId = motherAuth.user.id

            const { error: motherProfileErr } = await supabase.from('profiles').upsert([
                { id: motherId, full_name: motherUser.name, role: 'mother' }
            ])
            if (motherProfileErr) throw motherProfileErr
            console.log(`✅ Mother User created (ID: ${motherId})`)
        } else {
            console.log(`✅ Mother User already exists (ID: ${motherId})`)
        }


        // ----------------------------------------------------
        // 2. Create Doctor User
        // ----------------------------------------------------
        console.log("Creating Doctor User...")
        const docUser = USERS.doctor[0]
        let docId = null

        if (existingMotherAuth?.users) {
            const found = existingMotherAuth.users.find(u => u.email === docUser.email)
            if (found) docId = found.id
        }

        if (!docId) {
            const { data: docAuth, error: docAuthErr } = await supabase.auth.admin.createUser({
                email: docUser.email,
                password: docUser.password,
                email_confirm: true
            })
            if (docAuthErr) throw docAuthErr
            docId = docAuth.user.id

            const { error: docProfileErr } = await supabase.from('profiles').upsert([
                { id: docId, full_name: docUser.name, role: 'doctor' }
            ])
            if (docProfileErr) throw docProfileErr
            console.log(`✅ Doctor User created (ID: ${docId})`)
        } else {
            console.log(`✅ Doctor User already exists (ID: ${docId})`)
        }

        // ----------------------------------------------------
        // 3. Create Partner User
        // ----------------------------------------------------
        console.log("Creating Partner User...")
        const partnerUser = USERS.partner[0]
        let partnerId = null

        if (existingMotherAuth?.users) {
            const found = existingMotherAuth.users.find(u => u.email === partnerUser.email)
            if (found) partnerId = found.id
        }

        if (!partnerId) {
            const { data: partAuth, error: partAuthErr } = await supabase.auth.admin.createUser({
                email: partnerUser.email,
                password: partnerUser.password,
                email_confirm: true
            })
            if (partAuthErr) throw partAuthErr
            partnerId = partAuth.user.id

            const { error: partProfileErr } = await supabase.from('profiles').upsert([
                { id: partnerId, full_name: partnerUser.name, role: 'partner' }
            ])
            if (partProfileErr) throw partProfileErr
            console.log(`✅ Partner User created (ID: ${partnerId})`)
        } else {
            console.log(`✅ Partner User already exists (ID: ${partnerId})`)
        }

        // ----------------------------------------------------
        // 4. Seed Mother Vitals
        // ----------------------------------------------------
        console.log("Seeding Vitals...")
        const vitalsData = MOTHER_VITALS.map(v => ({
            mother_id: motherId,
            name: v.name,
            value: v.value,
            status: v.status,
            label: v.label
        }))
        // Optional: delete existing so we don't duplicate on re-run
        await supabase.from('vitals').delete().eq('mother_id', motherId)
        const { error: vitalsErr } = await supabase.from('vitals').insert(vitalsData)
        if (vitalsErr) throw vitalsErr
        console.log("✅ Vitals seeded.")

        // ----------------------------------------------------
        // 5. Seed Mother Appointments
        // ----------------------------------------------------
        console.log("Seeding Appointments...")
        const apptsData = MOTHER_APPOINTMENTS.map(a => ({
            mother_id: motherId,
            doctor_id: docId, // All test appointments link to our doc
            title: a.title,
            doctor: a.doctor,
            time: a.time,
            color: a.color,
            is_today: a.isToday
        }))
        await supabase.from('appointments').delete().eq('mother_id', motherId)
        const { error: apptsErr } = await supabase.from('appointments').insert(apptsData)
        if (apptsErr) throw apptsErr
        console.log("✅ Appointments seeded.")

        // ----------------------------------------------------
        // 6. Seed Patients (Doctor Dashboard)
        // ----------------------------------------------------
        console.log("Seeding Doctor's Patients...")
        const ptsData = PATIENTS.map(p => ({
            id: p.id,
            doctor_id: docId,
            mother_id: p.name === 'Priya Sharma' ? motherId : null, // Link the first patient to our new mother test user
            name: p.name,
            age: p.age,
            weeks: p.weeks,
            risk: p.risk,
            bp: p.bp,
            weight: p.weight,
            next_appt: p.nextAppt,
            status: p.status,
            phone: p.phone,
            tags: p.tags,
            notes: p.notes
        }))

        // Using upsert based on the string 'id' from mock data
        const { error: ptsErr } = await supabase.from('patients').upsert(ptsData, { onConflict: 'id' })
        if (ptsErr) throw ptsErr
        console.log("✅ Patients seeded.")

        console.log("🎉 Seed completely successfully!")

    } catch (error) {
        console.error("❌ Seed failed:", error)
    }
}

seed()
