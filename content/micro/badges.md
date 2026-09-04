+++
title = "Badges, Buttons, &amp; Stamps"
description = "Every asset featured on this website and where I found it."
template = "micro/page.html"
+++
<style>
@keyframes idkman {
  to {background-position:-200% 0}
}

.animated-badge {
  text-shadow: 0 0 4px black;
  background:
   linear-gradient(to right, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)
   0 0/200% 100%;
  margin: 2px;
  padding: 2px;
  border-radius: 2px;
  animation: idkman 2s linear infinite;
}

.badge-listings {
  padding-top: 4px;
  & > div {
    margin: 4px;
    display: grid;
	gap: 8px;

	& > img {
      align-self: center;
	}

    & > div > flex {
      display: flex;
      flex-wrap: wrap;
	  margin-bottom: 2px;

	  & > span {
	    margin-right: auto;
        & > b {
          font-size: 1.25em;
		}
      }
	}
  }

  & > hr {
	opacity: 25%;
  }
}
</style>
{# default must be specified for tera to infer defaults #}
{%- component micro.badges_listing(w, h, lst=[{
  "title":"PLEASESPECIFYDEFAULTLOL",
  "commentary":"",
  "desc":"",
  "source_url":"",
  "source":"",
  "img":"",
  "animated":false,
}]) -%}
  {%- if lst[0]['title'] == 'PLEASESPECIFYDEFAULTLOL' -%}
    {{ throw(message="please specify the lst argument") }}
  {%- endif -%}
  {%- set lst = lst | sort(attribute="title") -%}
  {%- set classname = "bwh-" ~ w ~ "x" ~ h -%}
  <style>
    .{{ classname }} {
      & > div {
		grid-template-columns: {{w}}px auto;
	    & > img {
          width:{{w}}px;
          height:{{h}}px;
		}
      }
	}
  </style>
  <div class="badge-listings {{ classname }}">
  {%- for b in lst -%}
    <div>
	  <img src="/micro/badges/{{w}}x{{h}}/{{b.img}}" loading="lazy" />
	  <div>
	    <flex>
		  <span>
            {%- if b.animated -%}<span class="animated-badge">Animated!</span>{%- endif -%}
            <b>{{ b.title }}</b>{% if b.desc %} - <em>{{ b.desc }}</em>{% endif %}
		  </span>
          <em>
            {% set s = b.source -%}
            {%- if b.source_url -%}
              <a href="" target="_blank">{{s}}</a>
            {%- else -%}
              {{s}}
            {%- endif -%}
          </em>
	    </flex>
        {{ b.commentary }}
	  </div>
	</div>
	{%- if not loop.last %}<hr/>{% endif %}
  {%- endfor -%}
  </div>
{%- endcomponent -%}
{%- set badgedata = load_data(path="/static/micro/badges/badges.json") -%}

A complete listing of every badge/button/stamp/whatever featured on this site.
All images are GIFs generally limited to a 256 color pallette, and are to the best of my knowledge free to use.
## 80x15
{{ <micro.badges_listing w='80' h='15' lst={badgedata['80x15']} /> }}

## 88x31
{{ <micro.badges_listing w='88' h='31' lst={badgedata['88x31']} /> }}

## 80x80
{{ <micro.badges_listing w='80' h='80' lst={badgedata['80x80']} /> }}

